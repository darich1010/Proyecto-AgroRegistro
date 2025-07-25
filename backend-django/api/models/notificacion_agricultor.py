# backend-django/api/models/notificacion_agricultor.py

from django.db import models
from .agricultor import Agricultor
from .cliente import Cliente
from .oferta import Oferta

class NotificacionAgricultor(models.Model):
    agricultor = models.ForeignKey(Agricultor, on_delete=models.CASCADE, related_name='notificaciones')
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    oferta = models.ForeignKey(Oferta, on_delete=models.CASCADE)
    mensaje = models.TextField()
    leido = models.BooleanField(default=False)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notificación para {self.agricultor.nombre}: {self.mensaje}"
