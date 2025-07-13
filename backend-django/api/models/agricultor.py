from django.db import models
from django.contrib.auth.models import User

class Agricultor(models.Model):
    nombre = models.CharField(max_length=100)
    telefono = models.CharField(max_length=15)
    departamento = models.CharField(max_length=100)
    provincia = models.CharField(max_length=100)
    distrito = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre
