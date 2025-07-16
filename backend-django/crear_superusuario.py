# crear_superusuario.py
from django.contrib.auth.models import User

username = 'adminpro'
password = 'admin1234'
email = 'admin@prodec.pe'

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, password=password, email=email)
    print("✅ Superusuario creado correctamente.")
else:
    print("⚠️ El usuario ya existe.")
