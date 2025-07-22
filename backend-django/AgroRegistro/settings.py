import logging
import sys
from pathlib import Path
from decouple import config
import dj_database_url
from corsheaders.defaults import default_headers

# BASE_DIR sirve para rutas relativas dentro del proyecto
BASE_DIR = Path(__file__).resolve().parent.parent

# Seguridad y entorno
SECRET_KEY = config('SECRET_KEY', default='fallback-key')
DEBUG = config('DEBUG', default=False, cast=bool)
ALLOWED_HOSTS = ['*']  # Railway acepta esto

# Aplicaciones instaladas
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Terceros
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',  # 👈 necesario para permitir CORS

    # Tu app
    'api',
]

# MODELO DE USUARIO PERSONALIZADO
AUTH_USER_MODEL = 'api.Usuario'

# Middleware
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # 👈 DEBE ir primero
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'AgroRegistro.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'AgroRegistro.wsgi.application'

# Base de datos
DATABASES = {
    'default': dj_database_url.config(
        default=config('DATABASE_URL'),
        conn_max_age=600,
        ssl_require=True
    )
}

# Validación de contraseñas
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internacionalización
LANGUAGE_CODE = 'es'
TIME_ZONE = 'America/Lima'
USE_I18N = True
USE_TZ = True

# Archivos estáticos
STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# 🔐 AUTENTICACIÓN REST
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ),
}

# ✅ CONFIGURACIÓN CORS CORRECTA Y COMPLETA
CORS_ALLOWED_ORIGINS = [
    "https://agroregistro-frontend.vercel.app",
    "http://localhost:3000",
]

CORS_ALLOW_CREDENTIALS = True  # 👈 Permite cookies/tokens si es necesario

CORS_ALLOW_HEADERS = list(default_headers) + [
    'authorization',
    'content-type',
    'access-control-allow-origin',
]

CORS_EXPOSE_HEADERS = ['Content-Disposition']  # 👈 Útil para descargas, opcional

# 🔐 CSRF desde el frontend de Vercel
CSRF_TRUSTED_ORIGINS = [
    'https://agroregistro-frontend.vercel.app',
]

# Logging
LOGGING = {
    'version': 1,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'stream': sys.stdout,
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}

# 🔧 Métodos permitidos explícitamente
CORS_ALLOW_METHODS = [
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
]


# dummy change to force redeploy
