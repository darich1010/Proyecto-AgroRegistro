import logging
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .serializers import RegisterSerializer
from rest_framework.permissions import IsAuthenticated


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


# ✅ Ver información del usuario autenticado
class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

# ✅ CRUD Agricultor con validación personalizada
class AgricultorViewSet(viewsets.ModelViewSet):
    queryset = Agricultor.objects.all()
    serializer_class = AgricultorSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user_id = request.data.get('usuario_id')  # Cambiado a 'usuario_id'
        if Agricultor.objects.filter(usuario_id=user_id).exists():
            return Response(
                {"usuario_id": ["Este usuario ya tiene un perfil de agricultor."]},
                status=status.HTTP_400_BAD_REQUEST
            )

        mutable_data = request.data.copy()
        mutable_data['usuario'] = user_id  # Asignación correcta del campo
        serializer = self.get_serializer(data=mutable_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# ✅ CRUD Cliente con validación personalizada
class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user_id = request.data.get('usuario_id')  # Cambiado a 'usuario_id'
        if Cliente.objects.filter(usuario_id=user_id).exists():
            return Response(
                {"usuario_id": ["Este usuario ya tiene un perfil de cliente."]},
                status=status.HTTP_400_BAD_REQUEST
            )

        mutable_data = request.data.copy()
        mutable_data['usuario'] = user_id  # Asignación correcta del campo
        serializer = self.get_serializer(data=mutable_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# ✅ CRUD restantes
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
