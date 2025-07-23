from django.db import models
from .cliente import Cliente
from .producto import Producto

class SolicitudProducto(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='solicitudes')
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='solicitudes')
    cantidad = models.PositiveIntegerField()
    descripcion = models.TextField(blank=True)
    fecha_solicitud = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.cliente.nombre} solicita {self.cantidad} de {self.producto.nombre}"