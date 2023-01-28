
from django.contrib import admin
from django.urls import path
from .views import Autenticacion, Login, Logout

urlpatterns = [
    path('/registrar', Autenticacion.as_view(), name='Autenticion_registrar'),
    path('/<str:pk>/delete', Autenticacion.as_view(), name='Autenticacion_elminar'),
    path('/login', Login.as_view(), name='Login'),
    path('/logout', Logout.as_view(), name='Logout')
]
