from rest_framework import serializers
from .models.usuario import Usuario
from .models import Agricultor, Categoria, Producto, Oferta, Cliente


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
    # Copiar datos antes de modificarlos
    extra_fields = validated_data.copy()

    tipo = validated_data.pop('tipo_usuario')
    password = validated_data.pop('password')

    # ⚠️ Eliminar claves no pertenecientes al modelo Usuario
    for campo in ['nombre', 'telefono', 'direccion', 'ruc', 'empresa']:
        validated_data.pop(campo, None)

    try:
        print("✅ Datos para crear usuario:", validated_data)
        usuario = Usuario(**validated_data)
        usuario.set_password(password)
        usuario.tipo_usuario = tipo
        usuario.save()
        print("✅ Usuario creado con ID:", usuario.id)
    except Exception as e:
        print("❌ Error al crear Usuario:", str(e))
        raise

    # Crear perfil según tipo de usuario
    try:
        if tipo == 'cliente':
            Cliente.objects.create(
                usuario=usuario,
                nombre=extra_fields.get('nombre', ''),
                direccion=extra_fields.get('direccion', ''),
                telefono=extra_fields.get('telefono', '')
            )
            print("✅ Perfil cliente creado")
        elif tipo == 'agricultor':
            Agricultor.objects.create(
                usuario=usuario,
                nombre=extra_fields.get('nombre', ''),
                telefono=extra_fields.get('telefono', ''),
                departamento='',
                provincia='',
                distrito='',
            )
            print("✅ Perfil agricultor creado")
    except Exception as e:
        print("❌ Error al crear perfil:", str(e))
        raise

    return usuario


class AgricultorSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=Usuario.objects.all(), source='usuario', write_only=True
    )

    class Meta:
        model = Agricultor
        fields = ['id', 'user', 'user_id', 'nombre', 'telefono', 'departamento', 'provincia', 'distrito']


class ClienteSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=Usuario.objects.all(), source='usuario', write_only=True
    )

    class Meta:
        model = Cliente
        fields = ['id', 'nombre', 'direccion', 'telefono', 'user', 'user_id']


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
