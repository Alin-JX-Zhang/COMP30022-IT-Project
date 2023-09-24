import re

from django.shortcuts import render

from utils.auth import check_login
from utils.db import get_user_by_username, save_user, get_user_by_email, change_pwd
from utils.email import get_token, send_email_code, get_user_id
from utils.json_response import JsonResponse


# Create your views here.
# view function
# Log in
def login(request):
    if request.method == 'POST':
        # Get parameters
        username = request.POST.get('username')
        password = request.POST.get('password')
        # verify。Get user
        user = get_user_by_username(username)
        # If user does not exist
        if not user:
            return JsonResponse.error("User does not exist")
        # If the password is incorrect
        if user['PassWord'] != password:
            return JsonResponse.error("Wrong password")
        # write session
        request.session['user_id'] = user['AccountID']
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
        # verify
        # If the user name or email already exists
        if get_user_by_username(username) or get_user_by_username(email):
            return JsonResponse.error("User name or email already exists")
        # If the password is too short
        if len(password) < 6:
            return JsonResponse.error("Password is too short")
        # Regular expression to verify email format
        if not re.match(r'^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$', email):
            return JsonResponse.error("Email format error")
        # Save user information
        if not save_user(username, password, email):
            return JsonResponse.error("registration failed")
        # Write to database
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
        user = get_user_by_email(email)
        # If the user does not exist
        if not user:
            return JsonResponse.error("User does not exist")
        # Generate token
        token = get_token(user['AccountID'])
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
        # change Password
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
