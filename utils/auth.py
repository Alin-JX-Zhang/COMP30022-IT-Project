from django.shortcuts import redirect

from utils.db import get_user_by_id
from utils.json_response import JsonResponse


# Login authentication decorator
def check_login(func):  # Custom login verification decorator

    def warpper(request, *args, **kwargs):
        # Get the user id in the session
        user_id = request.session.get('user_id', False)
        # Get user
        if user_id:
            # Get user information from the database
            user = get_user_by_id(user_id)
            # Save user to context
            request.user = user
            return func(request, *args, **kwargs)
        else:
            return JsonResponse.not_login()

    return warpper


# Permission authentication decorator
def check_permission(func):  # Custom permission verification decorator

    def warpper(request, *args, **kwargs):
        permission = request.session.get('permission', False)
        if permission:
            return func(request, *args, **kwargs)
        else:
            return redirect("/index")

    return warpper
