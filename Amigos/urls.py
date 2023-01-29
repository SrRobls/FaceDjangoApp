
from django.urls import path
from .views import Solicitud

urlpatterns = [
    path('enviar_solicitud', Solicitud.as_view(), name='Enviar_solicitud'),
    path('obtener_solicitudes/<str:id_user>', Solicitud.as_view(), name='obtener_solicitudes'),
    path('eliminar_solicitud/<str:id_solicitud>', Solicitud.as_view(), name='Eliminar_solicitud'),
    path('aceptar_solicitud/<str:id_solicitud>', Solicitud.as_view(), name='Aceptar_solicitud'),
]
