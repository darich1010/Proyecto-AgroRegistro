from rest_framework import serializers
from .models.usuario import Usuario
from .models import Agricultor, Categoria, Producto, Oferta, Cliente



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario  # ← Usamos el modelo personalizado
        fields = ['id', 'username', 'email']



class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    tipo_usuario = serializers.ChoiceField(choices=[('cliente', 'Cliente'), ('agricultor', 'Agricultor')])
    # Campos adicionales para Cliente/Agricultor
    direccion = serializers.CharField(required=False)
    telefono = serializers.CharField(required=False)
    nombre = serializers.CharField(required=False)
    ruc = serializers.CharField(required=False)
    empresa = serializers.CharField(required=False)

    class Meta:
        model = Usuario
        fields = ['username', 'email', 'password', 'tipo_usuario',
                  'direccion', 'telefono', 'nombre', 'ruc', 'empresa']

    def create(self, validated_data):
        tipo = validated_data.pop('tipo_usuario')
        password = validated_data.pop('password')

        usuario = Usuario(**validated_data)
        usuario.set_password(password)
        usuario.tipo_usuario = tipo
        usuario.save()

        if tipo == 'cliente':
            Cliente.objects.create(
                usuario=usuario,
                nombre=validated_data.get('nombre', ''),
                direccion=validated_data.get('direccion', ''),
                telefono=validated_data.get('telefono', '')
            )
        elif tipo == 'agricultor':
            Agricultor.objects.create(
                usuario=usuario,
                nombre=validated_data.get('nombre', ''),
                telefono=validated_data.get('telefono', ''),
                departamento='',
                provincia='',
                distrito='',
                ruc=validated_data.get('ruc', ''),
                empresa=validated_data.get('empresa', '')
            )

        return usuario



class AgricultorSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=Usuario.objects.all(), source='usuario', write_only=True
    )

    class Meta:
        model = Agricultor
        fields = ['id', 'user', 'user_id', 'nombre', 'telefono', 'departamento', 'provincia', 'distrito']



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



class ClienteSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=Usuario.objects.all(), source='usuario', write_only=True
    )

    class Meta:
        model = Cliente
        fields = ['id', 'nombre', 'direccion', 'telefono', 'user', 'user_id']
