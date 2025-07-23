from rest_framework import serializers
from .models.usuario import Usuario
from .models import Agricultor, Categoria, Producto, Oferta, Cliente, CarritoItem, SolicitudProducto



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'tipo_usuario']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    tipo_usuario = serializers.ChoiceField(choices=Usuario.TIPO_USUARIO_CHOICES)

    # Campos opcionales para cliente o agricultor
    direccion = serializers.CharField(required=False)
    telefono = serializers.CharField(required=False)
    nombre = serializers.CharField(required=False)
    ruc = serializers.CharField(required=False)
    empresa = serializers.CharField(required=False)

    class Meta:
        model = Usuario
        fields = ['username', 'email', 'password', 'tipo_usuario',
                  'nombre', 'telefono', 'direccion', 'ruc', 'empresa']

    def create(self, validated_data):
        tipo = validated_data.pop('tipo_usuario')
        password = validated_data.pop('password')

        # Extrae campos adicionales (no son parte de Usuario)
        nombre = validated_data.pop('nombre', '')
        telefono = validated_data.pop('telefono', '')
        direccion = validated_data.pop('direccion', '')
        ruc = validated_data.pop('ruc', '')
        empresa = validated_data.pop('empresa', '')

        usuario = Usuario(**validated_data)
        usuario.set_password(password)
        usuario.tipo_usuario = tipo
        usuario.save()

        if tipo == 'cliente':
            Cliente.objects.create(
                usuario=usuario,
                nombre=nombre,
                direccion=direccion,
                telefono=telefono
            )
        elif tipo == 'agricultor':
            Agricultor.objects.create(
                usuario=usuario,
                nombre=nombre,
                telefono=telefono,
                departamento='',
                provincia='',
                distrito='',
            )

        return usuario


class AgricultorSerializer(serializers.ModelSerializer):
    usuario = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=Usuario.objects.all(), source='usuario', write_only=True
    )

    class Meta:
        model = Agricultor
        fields = ['id', 'usuario', 'user_id', 'nombre', 'telefono', 'departamento', 'provincia', 'distrito']


class ClienteSerializer(serializers.ModelSerializer):
    usuario = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=Usuario.objects.all(), source='usuario', write_only=True
    )

    class Meta:
        model = Cliente
        fields = ['id', 'nombre', 'direccion', 'telefono', 'usuario', 'user_id']


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'


class ProductoSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer(read_only=True)
    categoria_id = serializers.PrimaryKeyRelatedField(
        queryset=Categoria.objects.all(), source='categoria', write_only=True
    )

    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'categoria', 'categoria_id']


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

class CarritoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarritoItem
        # Excluye el campo cliente de escritura directa
        fields = ['id', 'oferta', 'cantidad', 'agregado_en']
        read_only_fields = ['id', 'agregado_en', 'cliente']

class SolicitudProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SolicitudProducto
        fields = '__all__'
