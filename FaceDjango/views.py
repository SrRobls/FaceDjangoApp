from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
# Create your views here.

class getEndPoints(APIView):

    def get(self, requets):
        
        end_points = [

            {
                'Endpoint': '/registro',
                'method': 'POST',
                'body': {'body': ""},
                'descrption': 'Crea un nuevo usuario'
            },

            {
                'Endpoint': '/login',
                'method': 'GET',
                'body': None,
                'descrption': 'Retorno informacion del usuario como tambien el Token relacionado con este'
            },

            {
                'Endpoint': '/loggout',
                'method': 'POST',
                'body': {'body': ""},
                'descrption': 'Recibe el token del usaurio logguead, elimina ese token y las sessiones del usuario'
            },

            {
                'Endpoint': '/obtener_solicitudes',
                'method': 'GET',
                'body': None,
                'descrption': 'Retorna las solicitudes de amistad que le llegaron al usuario'
            },

            {
                'Endpoint': '/aceptar_solicitud',
                'method': 'POST',
                'body': {'body': ""},
                'descrption': 'Se crea una amistad entre el usuario receptor y el remitente (nueva instancia en la tabla Amistad)'
            },

            {
                'Endpoint': '/cancelar_solicitud/id_solicitud',
                'method': 'DELETE',
                'body': None,
                'descrption': 'Se elimina la solicitud de amistad'
            },

            {
                'Endpoint': '/enviar_solicitud',
                'method': 'POST',
                'body': {'body': ""},
                'descrption': 'se envia (crea) una solicitud de amistad que recibe el id del usuario que lo envia y el id del que lo recibe'
            },

            {
                'Endpoint': '/amigos',
                'method': 'GET',
                'body': None,
                'descrption': 'Retorna información sobre los amigos del usuario'
            },

            {
                'Endpoint': '/eliminar_amigo/id_amigo',
                'method': 'DELETE',
                'body':  None,
                'descrption': 'Elimina un amigo del usuario'
            },

            {
                'Endpoint': '/mensajes/id_amistad',
                'method': 'GET',
                'body': None,
                'descrption': 'Retorna los mensajes (conversación) entre dos usuarios que son amigos, recibe el id de la amistad entre lo usuarios'
            },

            {
                'Endpoint': '/enviar_mensaje',
                'method': 'POST',
                'body': {'body': ""},
                'descrption': 'se envia (crea) un nuevo mensaje, el cual recibe el id de amistad y el id del usaurio que lo envia entre otros'
            },

            {
                'Endpoint': '/publicaciones/id_user',
                'method': 'GET',
                'body': None,
                'descrption': 'Obtener las prublicaciones segun el id del user'
            },

            {
                'Endpoint': '/crear_publicacion',
                'method': 'POST',
                'body': {'body': ""},
                'descrption': 'Crear una publicacion para el usuario loggueado'
            },

            {
                'Endpoint': '/publicacion/id/update',
                'method': 'PUT',
                'body': None,
                'descrption': 'Actualizar publicacion'
            },

            {
                'Endpoint': '/publicacion/id/delete',
                'method': 'DELETE',
                'body': None,
                'descrption': 'Eliminar publicacion'
            },

            {
                'Endpoint': '/publicaciones/',
                'method': 'GET',
                'body': None,
                'descrption': 'Obtener todas las publicaciones'
            }
        ]
        
        return Response(end_points, status=status.HTTP_200_OK)

    

