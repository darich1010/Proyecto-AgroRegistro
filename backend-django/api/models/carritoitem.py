from django.db import models
from .cliente import Cliente
from .oferta import Oferta

class CarritoItem(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='carrito_items')
    oferta = models.ForeignKey(Oferta, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=1)
    agregado_en = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('cliente', 'oferta')  # evita duplicados exactos en el carrito

    def __str__(self):
        return f"{self.cantidad} x {self.oferta.producto.nombre} para {self.cliente.nombre}"