import base64
import smtplib
import time
from email.mime.text import MIMEText
from django.core.mail import send_mail

from random import randrange

from demo.settings import EMAIL_FROM


# Generate token
def get_token(user_id):
    timestamp = time.time()
    # Generate token
    token = str(user_id) + '_' + str(timestamp)
    # Encryption
    token = base64.b64encode(token.encode('utf-8'))
    return token.decode('utf-8')


def get_user_id(token):
    # Decrypt
    token = base64.b64decode(token).decode('utf-8')
    # Split
    user_id = token.split('_')[0]
    return user_id


base_url = 'http://127.0.0.1:8000'


# send email
def send_email_code(email, token):
    # Part 2: Formal email sending function
    # mail title
    send_title = 'Reset your password'
    # Email text. Link to reset password
    # The change_password.html here is the front-end password reset page. Need to write it yourself
    # After the front-end obtains the token, it sends the token and the new password to the back-end change_password interface.
    send_body = 'Please click the link below to reset your password:\n' \
                + base_url + '/change_password.html?token=' + token

    # Send the email and return the status. If the status is 1, it is successful.
    status = send_mail(send_title, send_body, EMAIL_FROM, [email])
    print(status)
    return status
