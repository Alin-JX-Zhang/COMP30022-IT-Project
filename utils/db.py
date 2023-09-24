from typing import Union
from user.models import Account, Profile


# Initialize mysql connection


# Save user information. Returns True on success, False on failure
def save_user(username: str, password: str, email: str) -> bool:
    # Complete the save logic
    Profile.objects.create(Email=email, SecureLevel=1)
    profile_id = Profile.objects.get(Email=email).ProfileID
    Account.objects.create(PassWord=password, UserName=username, Authority=2, ProfileID=profile_id)
    return True


# Pass in the id and get the account number. Returns a dictionary type. If there is no such user, returns None
def get_user_by_id(user_id: int) -> Union[dict, None]:
    # Complete query logic
    account = Account.objects.filter(AccountID=user_id).all()
    if account:
        return account[0].to_dict()
    else:
        return None


# Pass in username and get the account. Returns a dictionary type. If there is no such user, returns None
def get_user_by_username(username: str) -> Union[dict, None]:
    # Complete query logic
    account = Account.objects.filter(UserName=username).all()
    if account:
        return account[0].to_dict()
    else:
        return None


# Pass in the email and get the account number. Returns a dictionary type. If there is no such user, returns None
def get_user_by_email(email: str) -> Union[dict, None]:
    # Complete query logic
    profile = Profile.objects.filter(Email=email).all()
    if profile:
        account = Account.objects.filter(ProfileID=profile[0].ProfileID).all()
        if account:
            return account[0].to_dict()
        else:
            return None
    else:
        return None


# change Password. Returns True on success, False on failure
def change_pwd(user_id: int, new_password: str) -> bool:
    # Complete the change password logic
    account = Account.objects.filter(AccountID=user_id).all()
    if account:
        account[0].PassWord = new_password
        account[0].save()
        return True
    else:
        return False