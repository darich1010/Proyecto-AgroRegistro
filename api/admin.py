from django.contrib import admin
from .models import Agricultor, Categoria, Producto, Oferta

@admin.register(Agricultor)
class AgricultorAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'telefono', 'departamento', 'provincia', 'user')
    list_filter = ('departamento', 'provincia')

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre')
    search_fields = ('nombre',)

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'categoria')
    search_fields = ('nombre', 'categoria__nombre')
    list_filter = ('categoria',)

@admin.register(Oferta)
class OfertaAdmin(admin.ModelAdmin):
    list_display = ('producto', 'agricultor', 'precio', 'stock') 
    search_fields = ('producto__nombre', 'agricultor__user__username')
    list_filter = ('producto__categoria',)  

    
