from rest_framework import serializers
from .models.usuario import Usuario
from .models import Agricultor, Categoria, Producto, Oferta, Cliente, CarritoItem, SolicitudProducto, RespuestaSolicitud, NotificacionAgricultor


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

class ProductoNombreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id', 'nombre']

class ClienteNombreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ['id', 'nombre']

class SolicitudProductoSerializer(serializers.ModelSerializer):
    producto = ProductoNombreSerializer(read_only=True)  # ← Cambiado aquí
    cliente = ClienteNombreSerializer(read_only=True)

    class Meta:
        model = SolicitudProducto
        fields = '__all__'
class RespuestaSolicitudSerializer(serializers.ModelSerializer):
    solicitud = SolicitudProductoSerializer(read_only=True)
    solicitud_id = serializers.PrimaryKeyRelatedField(
        queryset=SolicitudProducto.objects.all(), source='solicitud', write_only=True
    )
    agricultor = AgricultorSerializer(read_only=True)
    agricultor_id = serializers.PrimaryKeyRelatedField(
        queryset=Agricultor.objects.all(), source='agricultor', write_only=True
    )

    class Meta:
        model = RespuestaSolicitud
        fields = ['id', 'solicitud', 'solicitud_id', 'agricultor', 'agricultor_id', 'mensaje', 'fecha_respuesta']

class NotificacionAgricultorSerializer(serializers.ModelSerializer):
    agricultor = AgricultorSerializer(read_only=True)
    agricultor_id = serializers.PrimaryKeyRelatedField(
        queryset=Agricultor.objects.all(), source='agricultor', write_only=True
    )
    cliente = ClienteNombreSerializer(read_only=True)
    cliente_id = serializers.PrimaryKeyRelatedField(
        queryset=Cliente.objects.all(), source='cliente', write_only=True
    )
    oferta = OfertaSerializer(read_only=True)
    oferta_id = serializers.PrimaryKeyRelatedField(
        queryset=Oferta.objects.all(), source='oferta', write_only=True
    )

    class Meta:
        model = NotificacionAgricultor
        fields = [
            'id',
            'agricultor', 'agricultor_id',
            'cliente', 'cliente_id',
            'oferta', 'oferta_id',
            'mensaje',
            'leido',
            'fecha_creacion'
        ]
