
from django.urls import path
from .views import Publicaciones

urlpatterns = [
    path('crear_publicacion', Publicaciones.as_view(), name='Crear_Publicacion'),
    path('<str:id>', Publicaciones.as_view(), name='Obtener_publicaciones'),
]
