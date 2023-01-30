
from django.urls import path
from .views import Solicitud, Mensajes

urlpatterns = [
    path('enviar_solicitud', Solicitud.as_view(), name='Enviar_solicitud'),
    path('obtener_solicitudes_y_amistad/<str:id_user>', Solicitud.as_view(), name='obtener_solicitudes'),
    path('eliminar_solicitud_o_amistad/<str:id_solicitud>', Solicitud.as_view(), name='Eliminar_solicitud'),
    path('aceptar_solicitud/<str:id_solicitud>', Solicitud.as_view(), name='Aceptar_solicitud'),

    path('enviar_mensaje', Mensajes.as_view(), name='Enviar_Mensaje'),
    path('obtener_mensajes/<str:id_amistad>', Mensajes.as_view(), name = 'Obtener_mensajes')

]
