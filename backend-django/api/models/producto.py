# models/producto.py
from django.db import models
from .categoria import Categoria
from .agricultor import Agricultor  # 👈 Asegúrate de importar

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name='productos')
    agricultor = models.ForeignKey(Agricultor, on_delete=models.CASCADE, related_name='productos')  # ✅ nuevo campo

    def __str__(self):
        return f"{self.nombre} ({self.categoria})"