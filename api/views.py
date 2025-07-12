from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .models import Agricultor, Categoria, Producto, Oferta
from .serializers import (
    UserSerializer,
    RegisterSerializer,
    AgricultorSerializer,
    CategoriaSerializer,
    ProductoSerializer,
    OfertaSerializer
)

# Registro de usuario (POST /api/register/)
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

# Info del usuario logueado (GET /api/user/)
class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

# Agricultor CRUD
class AgricultorViewSet(viewsets.ModelViewSet):
    queryset = Agricultor.objects.all()
    serializer_class = AgricultorSerializer
    permission_classes = [IsAuthenticated]

# Categoría CRUD
class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [IsAuthenticated]

# Producto CRUD
class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [IsAuthenticated]

# Oferta CRUD
class OfertaViewSet(viewsets.ModelViewSet):
    queryset = Oferta.objects.all()
    serializer_class = OfertaSerializer
    permission_classes = [IsAuthenticated]
