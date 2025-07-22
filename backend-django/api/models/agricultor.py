from django.db import models
from .usuario import Usuario  # Cambio necesario

class Agricultor(models.Model):
    nombre = models.CharField(max_length=100)
    telefono = models.CharField(max_length=15)
    departamento = models.CharField(max_length=100)
    provincia = models.CharField(max_length=100)
    distrito = models.CharField(max_length=100)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)  # Cambio aquí

    def __str__(self):
        return self.nombre
