import re

from django.shortcuts import render

from utils.auth import check_login
from utils.db import get_user_by_username, save_user, get_user_by_email, change_pwd
from utils.email import get_token, send_email_code, get_user_id
from utils.json_response import JsonResponse
from user.models import *

# Create your views here.
# view function
# Log in
def login(request):
    if request.method == 'POST':
        # Get parameters
        username = request.POST.get('username')
        password = request.POST.get('password')
        # verify。Get user

        # If user does not exist
        try:
            account = Account.objects.get(username=username)
            # Continue processing with the 'account' object
        except Account.DoesNotExist:
            # Handle the case where username does not exist in the database
            return JsonResponse.error("User does not exist")

        try:
            account = Account.objects.get(username=username,password=password)
            # Continue processing with the 'account' object
        except Account.DoesNotExist:
            # Handle the case where username does not exist in the database
            return JsonResponse.error("Wrong password!")

        # write session
        request.session['user_id'] = account.id
        return JsonResponse.success("login successful", None)


# Sign out
@check_login
def logout(request):
    # clear session
    request.session.flush()
    return JsonResponse.success("Logout successful", None)


# register
def register(request):
    if request.method == 'POST':
        # Get parameters
        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')
        # verify if account exist
        if Account.objects.filter(username=username).exists():
            return JsonResponse.error("Username already exists!")

        if Verification.objects.filter(email=email).exists():
            return JsonResponse.error("Email already exists!")

        # If the password is too short
        if len(password) < 6:
            return JsonResponse.error("Password is too short")
        # Regular expression to verify email format
        if not re.match(r'^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$', email):
            return JsonResponse.error("Email format error")
        # Save user information

        # Profile.objects.create() # not yet implement
        account = Account.objects.create(username=username, password=password)
        account.save()
        verification = Verification.objects.create(email=email, accountid=account)
        verification.save()
        return JsonResponse.success("registration success", None)


# Get user information
@check_login
def get_user_info(request):
    # Get user
    user = request.user

    return JsonResponse.success("", user)


# forget the password. Send email, reset password
def forget_password(request):
    if request.method == 'POST':
        # Get email
        email = request.POST.get('email')
        # Get user
        try:
            verification = Verification.objects.get(email=email)
        except Verification.DoesNotExist:
            # If the email does not exist
            return JsonResponse.error("Email is not exist!")
        try:
            account = verification.accountid
        except Account.DoesNotExist:
            return JsonResponse.error("User does not exist")

        # Generate token
        token = get_token(account.id)
        # send email
        status = send_email_code(email, token)
        # Failed to send
        if not status:
            return JsonResponse.error("Failed to send email")
        # Sent successfully
        return JsonResponse.success("Successfully sent email", None)


# change Password
def change_password(request):
    if request.method == 'POST':
        # Get token
        token = request.POST.get('token')
        # Get new password
        new_password = request.POST.get('new_password')
        # Get user id
        user_id = get_user_id(token)

        # change password here
        account = Account.objects.get(id=user_id)
        account.password = new_password
        account.save()

        if not change_pwd(user_id, new_password):
            return JsonResponse.error("Failed to change password")
        # Password reset successful
        return JsonResponse.success("Password reset successfully", None)


# Modify user information
def change_info(request):
    return JsonResponse.success("Successfully modified", None)


# Modify user avatar
def change_avatar(request):
    return JsonResponse.success("Successfully modified", None)
