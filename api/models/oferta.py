from django.db import models
from .producto import Producto
from .agricultor import Agricultor

class Oferta(models.Model):
    agricultor = models.ForeignKey(Agricultor, on_delete=models.CASCADE, related_name='ofertas')
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()  # Este campo era el que faltaba   

    def __str__(self):
        return f"{self.producto.nombre} - {self.precio} soles"
