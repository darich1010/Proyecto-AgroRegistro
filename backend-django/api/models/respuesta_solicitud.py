from django.db import models
from .solicitud_producto import SolicitudProducto
from .agricultor import Agricultor

class RespuestaSolicitud(models.Model):
    solicitud = models.ForeignKey(SolicitudProducto, on_delete=models.CASCADE, related_name='respuestas')
    agricultor = models.ForeignKey(Agricultor, on_delete=models.CASCADE)
    mensaje = models.TextField()
    fecha_respuesta = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Respuesta de {self.agricultor.nombre} a solicitud #{self.solicitud.id}"
