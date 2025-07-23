from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    RegisterView, UserView,
    AgricultorViewSet, CategoriaViewSet,
    ProductoViewSet, OfertaViewSet, ClienteViewSet, CarritoItemViewSet
)

router = DefaultRouter()
router.register(r'agricultores', AgricultorViewSet)
router.register(r'categorias', CategoriaViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'ofertas', OfertaViewSet)
router.register(r'clientes', ClienteViewSet)
router.register(r'carrito', CarritoItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('user/', UserView.as_view(), name='user'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
