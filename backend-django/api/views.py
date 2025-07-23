import logging
from rest_framework import status, viewsets
from django.db import IntegrityError
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import serializers
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import Agricultor, Cliente, Oferta, Categoria, Producto, CarritoItem
from .serializers import (
    RegisterSerializer,
    AgricultorSerializer,
    ClienteSerializer,
    CategoriaSerializer,
    ProductoSerializer,
    OfertaSerializer,
    UserSerializer,
    CarritoItemSerializer,
)

logger = logging.getLogger(__name__)

@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        logger.error("📥 Petición recibida en /api/register/")
        logger.error(f"📦 Datos recibidos: {request.data}")

        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            try:
                usuario = serializer.save()
                logger.error(f"✅ Usuario creado exitosamente: {usuario.username}")
                return Response({"message": "Usuario creado exitosamente", "id": usuario.id}, status=status.HTTP_201_CREATED)
            except Exception as e:
                import traceback
                logger.error("❌ Error al guardar usuario:")
                logger.error(traceback.format_exc())
                return Response({
                    "error": "Error al guardar usuario",
                    "detalle": str(e),
                    "trace": traceback.format_exc()
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        logger.error(f"❌ Errores en datos recibidos: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class AgricultorViewSet(viewsets.ModelViewSet):
    queryset = Agricultor.objects.all()
    serializer_class = AgricultorSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user_id = request.data.get('usuario_id')
        if Agricultor.objects.filter(usuario_id=user_id).exists():
            return Response(
                {"usuario_id": ["Este usuario ya tiene un perfil de agricultor."]},
                status=status.HTTP_400_BAD_REQUEST
            )

        mutable_data = request.data.copy()
        mutable_data['usuario'] = user_id
        serializer = self.get_serializer(data=mutable_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user_id = request.data.get('usuario_id')
        if Cliente.objects.filter(usuario_id=user_id).exists():
            return Response(
                {"usuario_id": ["Este usuario ya tiene un perfil de cliente."]},
                status=status.HTTP_400_BAD_REQUEST
            )

        mutable_data = request.data.copy()
        mutable_data['usuario'] = user_id
        serializer = self.get_serializer(data=mutable_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [IsAuthenticated]


class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [IsAuthenticated]


class OfertaViewSet(viewsets.ModelViewSet):
    queryset = Oferta.objects.all()
    serializer_class = OfertaSerializer
    permission_classes = [IsAuthenticated]


class CarritoItemViewSet(viewsets.ModelViewSet):
    queryset = CarritoItem.objects.all()
    serializer_class = CarritoItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        usuario = self.request.user
        if usuario.tipo_usuario == 'cliente':
            try:
                cliente = Cliente.objects.get(usuario=usuario)
                return CarritoItem.objects.filter(cliente=cliente).select_related('oferta__producto', 'oferta__agricultor')
            except Cliente.DoesNotExist:
                return CarritoItem.objects.none()
        return CarritoItem.objects.none()

    def perform_create(self, serializer):
        try:
            usuario = self.request.user
            print(f"👤 Usuario autenticado: {usuario} (ID: {usuario.id})")

            cliente = Cliente.objects.get(usuario=usuario)
            print(f"👥 Cliente encontrado: {cliente} (ID: {cliente.id})")

            oferta = serializer.validated_data['oferta']

            existente = CarritoItem.objects.filter(cliente=cliente, oferta=oferta).first()
            if existente:
                existente.cantidad += serializer.validated_data.get('cantidad', 1)
                existente.save()
                print(f"🟡 Ya existía: se actualizó la cantidad a {existente.cantidad}")
            else:
                carrito_item = serializer.save(cliente=cliente)
                print(f"✅ CarritoItem creado con ID: {carrito_item.id}")

        except Cliente.DoesNotExist:
            print(f"❌ Cliente no encontrado para el usuario ID: {usuario.id}")
            raise serializers.ValidationError("Cliente no encontrado para el usuario.")

        except IntegrityError as e:
            print(f"💥 Error de integridad: {str(e)}")
            raise serializers.ValidationError("Este producto ya está en tu carrito.")

        except Exception as e:
            print(f"🔥 Error interno en perform_create: {str(e)}")
            raise
