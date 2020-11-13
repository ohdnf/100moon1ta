from django.conf import settings
from allauth.account.adapter import DefaultAccountAdapter
from decouple import config

class CustomAccountAdapter(DefaultAccountAdapter):

    def get_login_redirect_url(self, request):
        path = config('EMAIL_REDIRECT_URL')
        return path
    
    def get_email_confirmation_redirect_url(self, request):
        path = config('EMAIL_REDIRECT_URL')
        return path