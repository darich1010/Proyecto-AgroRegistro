from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Agricultor, Categoria, Producto, Oferta, Cliente

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
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='user', write_only=True
    )

    class Meta:
        model = Agricultor
        fields = ['id', 'user', 'user_id', 'nombre', 'telefono', 'departamento', 'provincia', 'distrito']

# Categoría
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

# Producto
class ProductoSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer(read_only=True)
    categoria_id = serializers.PrimaryKeyRelatedField(
        queryset=Categoria.objects.all(), source='categoria', write_only=True
    )

    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'categoria', 'categoria_id']

# Oferta
class OfertaSerializer(serializers.ModelSerializer):
    agricultor = AgricultorSerializer(read_only=True)
    agricultor_id = serializers.PrimaryKeyRelatedField(
        queryset=Agricultor.objects.all(), source='agricultor', write_only=True
    )
    producto = ProductoSerializer(read_only=True)
    producto_id = serializers.PrimaryKeyRelatedField(
        queryset=Producto.objects.all(), source='producto', write_only=True
    )

    class Meta:
        model = Oferta
        fields = ['id', 'agricultor', 'agricultor_id', 'producto', 'producto_id', 'descripcion', 'precio', 'stock']


# Cliente
class ClienteSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='user', write_only=True
    )

    class Meta:
        model = Cliente
        fields = ['id', 'nombre', 'direccion', 'telefono', 'user', 'user_id']  # Asegúrate de incluir 'nombre'
