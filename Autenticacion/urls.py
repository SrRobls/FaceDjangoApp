
from django.contrib import admin
from django.urls import path
from .views import Autenticacion, Login, Logout, delete, info_perfil_usuario

urlpatterns = [
    path('registrar', Autenticacion.as_view(), name='Autenticion_registrar'),
    path('<str:pk>/delete', delete, name='Autenticacion_elminar'),
    path('login', Login.as_view(), name='Login'),
    path('logout', Logout.as_view(), name='Logout'),
    path('<str:id_user>', info_perfil_usuario, name='Obtener_perfil'),
]
