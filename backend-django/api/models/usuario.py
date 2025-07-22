from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    TIPO_USUARIO_CHOICES = [
        ('cliente', 'Cliente'),
        ('agricultor', 'Agricultor'),
        ('admin', 'Administrador'),
    ]
    tipo_usuario = models.CharField(max_length=20, choices=TIPO_USUARIO_CHOICES, default='cliente')

    def __str__(self):
        return f'{self.username} - {self.tipo_usuario}'
