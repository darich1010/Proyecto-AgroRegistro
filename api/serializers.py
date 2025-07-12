from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Agricultor, Categoria, Producto, Oferta

# Serializador de usuario
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

# Registro de nuevo usuario (con contraseña oculta)
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        return user

# Agricultor
class AgricultorSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Agricultor
        fields = '__all__'

# Categoría
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

# Producto
class ProductoSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer(read_only=True)

    class Meta:
        model = Producto
        fields = '__all__'

# Oferta
class OfertaSerializer(serializers.ModelSerializer):
    agricultor = AgricultorSerializer(read_only=True)
    producto = ProductoSerializer(read_only=True)

    class Meta:
        model = Oferta
        fields = '__all__'
