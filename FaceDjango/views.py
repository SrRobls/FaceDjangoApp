from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
# Create your views here.

class getEndPoints(APIView):

    def get(self, requets):
        
        end_points = [

            {
                'Endpoint': 'autenticacion/registrar',
                'method': 'POST',
                'body': {'body': ""},
                'descrption': 'Crea un nuevo usuario'
            },

            {
                'Endpoint': 'autenticacion/login',
                'method': 'GET',
                'body': None,
                'descrption': 'Retorno informacion del usuario como tambien el Token relacionado con este'
            },

            {
                'Endpoint': 'autenticacion/loggout',
                'method': 'POST',
                'body': {'body': ""},
                'descrption': 'Recibe el token del usaurio logguead, elimina ese token y las sessiones del usuario'
            },

            {
                'Endpoint': '/id_user/delete',
                'method': 'DELETE',
                'body': None,
                'descrption': 'Se elimina al usuario (el mismo)'
            },

            {
                'Endpoint': '/id_user',
                'method': 'GET',
                'body': None,
                'descrption': 'Obtener infomacion (basica, y sus publicaciones) de un usuario (externo)'
            },


            {
                'Endpoint': 'amigos/obtener_solicitudes/id_user',
                'method': 'GET',
                'body': None,
                'descrption': 'Retorna las solicitudes de amistad que le llegaron al usuario y las que envio tambien'
            },

            {
                'Endpoint': 'amigos/aceptar_solicitud/id',
                'method': 'PUT',
                'body': {'body': ""},
                'descrption': 'Se actualiza la instancio en la columna de si la solictud es acptada (se pone en True)'
            },

            {
                'Endpoint': 'amigos/eliminar_solicitud/id_solicitud',
                'method': 'DELETE',
                'body': None,
                'descrption': 'Se elimina la solicitud de amistad o amistad'
            },

            {
                'Endpoint': 'amigos/enviar_solicitud',
                'method': 'POST',
                'body': {'body': ""},
                'descrption': 'se envia (crea) una solicitud de amistad que recibe el id del usuario que lo envia y el id del que lo recibe'
            },

            {
                'Endpoint': 'amigos/obtener_amigos',
                'method': 'GET',
                'body': None,
                'descrption': 'Retorna información sobre los amigos del usuario'
            },

            {
                'Endpoint': 'amigos/eliminar_amigo/id_amigo',
                'method': 'DELETE',
                'body':  None,
                'descrption': 'Elimina un amigo del usuario'
            },

            {
                'Endpoint': 'amigos/mensajes/id_amistad',
                'method': 'GET',
                'body': None,
                'descrption': 'Retorna los mensajes (conversación) entre dos usuarios que son amigos, recibe el id de la amistad entre lo usuarios'
            },

            {
                'Endpoint': 'amigos/enviar_mensaje',
                'method': 'POST',
                'body': {'body': ""},
                'descrption': 'se envia (crea) un nuevo mensaje, el cual recibe el id de amistad y el id del usaurio que lo envia entre otros'
            },

            {
                'Endpoint': 'publicaciones/id_user',
                'method': 'GET',
                'body': None,
                'descrption': 'Obtener las prublicaciones segun el id del user'
            },

            {
                'Endpoint': 'publicaciones/crear_publicacion',
                'method': 'POST',
                'body': {'body': ""},
                'descrption': 'Crear una publicacion para el usuario loggueado'
            },

            {
                'Endpoint': '/publicaciones/id/update',
                'method': 'PUT',
                'body': None,
                'descrption': 'Actualizar publicacion'
            },

            {
                'Endpoint': '/publicaciones/id/delete',
                'method': 'DELETE',
                'body': None,
                'descrption': 'Eliminar publicacion'
            },

            {
                'Endpoint': '/publicaciones',
                'method': 'GET',
                'body': None,
                'descrption': 'Obtener todas las publicaciones'
            }
        ]
        
        return Response(end_points, status=status.HTTP_200_OK)

    

