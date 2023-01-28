
from django.urls import path
from .views import Publicaciones

urlpatterns = [
    path('crear_publicacion', Publicaciones.as_view(), name='Crear_Publicacion'),
    path('<str:id_user>', Publicaciones.as_view(), name='Obtener_publicaciones'),
    path('<str:pk>/update', Publicaciones.as_view(), name='Actualizar_publicacion'),
    path('<str:pk>/delete', Publicaciones.as_view(), name='Eliminar_publicacion'),
]
