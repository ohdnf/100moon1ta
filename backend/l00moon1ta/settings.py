import os
import datetime
from decouple import config


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = config('DJANGO_SECRET_KEY')

DEBUG = config("DEBUG", default=False, cast=bool)

ALLOWED_HOSTS = config("DJANGO_ALLOWED_HOSTS").split(" ")

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # swagger
    'drf_yasg',

    # cors, restframework
    'corsheaders',
    'rest_framework',

    # auth
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'rest_auth',
    'rest_auth.registration',

    # github login
    'allauth.socialaccount.providers.github',

    # mysql
    'django_mysql',

    # django-debug-toolbar
    'debug_toolbar',

    'users',
    'games',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'debug_toolbar.middleware.DebugToolbarMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'l00moon1ta.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates'),],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

AUTHENTICATION_BACKENDS = (
    # Needed to login by username in Django admin, regardless of `allauth`
    'django.contrib.auth.backends.ModelBackend',

    # `allauth` specific authentication methods, such as login by e-mail
    'allauth.account.auth_backends.AuthenticationBackend',
)

WSGI_APPLICATION = 'l00moon1ta.wsgi.application'

DATABASES = {
    'default' : {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': config('MYSQL_NAME'),
        'USER': config('MYSQL_USER'),
        'PASSWORD': config('MYSQL_PASSWORD'),
        'HOST': config('MYSQL_HOST'),
        'PORT': '3306',
        'OPTIONS': {
            'charset': 'utf8mb4',
        },
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'ko-KR'

TIME_ZONE = 'Asia/Seoul'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Redirection
LOGIN_REDIRECT_URL = '/'
ACCOUNT_ADAPTER = 'users.adapter.CustomAccountAdapter'

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

SITE_ID = 1

AUTH_USER_MODEL = 'users.CustomUser'

# Social Login
SOCIALACCOUNT_PROVIDERS = {
    'github': {
        'VERIFIED_EMAIL': True
        # 'SCOPE': [
        #     'user',
        #     'repo',
        #     'read:org',
        # ],
    }
}

# DRF Authentication
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',  
    ]
}

REST_AUTH_SERIALIZERS = {
    'USER_DETAILS_SERIALIZER': 'users.serializers.UserSerializer',
    'LOGIN_SERIALIZER': 'users.serializers.LoginSerializer',
}

REST_USE_JWT = True

JWT_AUTH = {
    'JWT_SECRET_KEY': SECRET_KEY,
    'JWT_ALGORITHM': 'HS256',
    'JWT_ALLOW_REFRESH': True,
    'JWT_EXPIRATION_DELTA': datetime.timedelta(days=7),             # Expirate in a week
    'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(days=28),    # Refresh expiration
}

# CORS
# CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://100moon1ta.com",
    "http://k3a406.p.ssafy.io",
]

# CustomUser
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USERNAME_REQUIRED = True
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_REQUIRED = True

# Email Authentication
ACCOUNT_EMAIL_VERIFICATION = 'mandatory'
ACCOUNT_CONFIRM_EMAIL_ON_GET = True
ACCOUNT_EMAIL_CONFIRMATION_ANONYMOUS_REDIRECT_URL = '/?verification=1'
ACCOUNT_EMAIL_CONFIRMATION_AUTHENTICATED_REDIRECT_URL = '/?verification=1'

# SMTP
# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend' # dev
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.naver.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER =  config('NAVER_ID')
EMAIL_HOST_PASSWORD = config('NAVER_PASSWORD')
DEFAULT_FROM_EMAIL = config('NAVER_ID') # 보내는 이를 변경, 네이버는 이게 사용하는 smtp와 일치하지 않으면 차단때림

# Cache
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        # "LOCATION": "redis://127.0.0.1:6379/1",
        "LOCATION": "redis://cache:6379/1",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient"
        },
        "KEY_PREFIX": "oneta"
    }
}

INTERNAL_IPS = [
    '127.0.0.1',
]
