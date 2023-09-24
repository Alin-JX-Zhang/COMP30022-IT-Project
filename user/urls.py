from django.contrib import admin
from django.urls import path, include
from user import views

urlpatterns = [
    # user
    path('login', views.login),
    path('register', views.register),
    path('logout', views.logout),
    path('info', views.get_user_info),

    # forget the password. Send email
    path('forget_password', views.forget_password),

    # Enter via the link in the mailbox, enter the password twice, and change the password
    path('change_password', views.change_password),

    # Change password (email authentication)
    path('change_password_by_email', views.change_password),

    # Modify user information
    path('change_info', views.change_info),

    # Modify user avatar
    path('change_avatar', views.change_avatar),



]
