
from django.urls import path
from .views import Publicaciones

urlpatterns = [
    path('crear', Publicaciones.as_view(), name='Crear_Publicacion'),
]
