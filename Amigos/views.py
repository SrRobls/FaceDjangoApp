from django.shortcuts import render
from rest_framework.views import APIView
from .models import Solicitud_amistad
from .serializer import SolicitudSerializer, SolicitudInfoSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.db.models import Q
from rest_framework.authtoken.models import Token


# Create your views here.


class Solicitud(APIView):


    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def verificar_token_usuario(self, id_user, request):
        authorization_header = request.META.get('HTTP_AUTHORIZATION', None).split()
        token = Token.objects.get(key = authorization_header[1])

        if int(token.user.id) != int(id_user):
            return True
        
        return False

    def post(self, request):
        data = request.data

        validar_token = self.verificar_token_usuario(data['user_sender'], request)
        if validar_token:
            return Response({'error': 'Token perteneciente a otro usuario'}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = SolicitudSerializer()
        serializer.create(validated_data = data)

        return Response('Solicitud enviada!', status=status.HTTP_201_CREATED)
    
    def delete(self, request, id_solicitud):

        try:
            solicitud = Solicitud_amistad.objects.get(id = id_solicitud)
            user_sender = solicitud.user_sender.id
            user_receptor = solicitud.user_receptor.id
        except:
            return Response({'error': 'id solicitud invalida'})

        validar_token_sender = self.verificar_token_usuario(user_sender, request)
        validar_token_receptor = self.verificar_token_usuario(user_receptor, request)

        if (validar_token_sender and user_receptor):
            return Response({'error': 'Token no perteneciente a alguno de los usuarios'}, status=status.HTTP_401_UNAUTHORIZED)
        solicitud.delete()

        return Response('Solicitud Eliminada', status=status.HTTP_200_OK)
    

    def put(self, request, id_solicitud):

        try:
            solicitud = Solicitud_amistad.objects.get(id = id_solicitud)
            user_receptor = solicitud.user_receptor.id
        except:
            return Response({'error': 'id solicitud invalida'})
        
        validar_token = self.verificar_token_usuario(user_receptor, request)
        if validar_token:
            return Response({'error': 'Token perteneciente a otro usuario'}, status=status.HTTP_401_UNAUTHORIZED)

        solicitud.is_aceptada = True
        solicitud.save()
        serializer = SolicitudInfoSerializer(solicitud)
        return Response({'Solicitud aceptada!': serializer.data}, status=status.HTTP_200_OK)
    
    def get(self, request, id_user):

        validar_token = self.verificar_token_usuario(id_user, request)
        if validar_token:
            return Response({'error': 'Token perteneciente a otro usuario'}, status=status.HTTP_401_UNAUTHORIZED)

        solicitudes = Solicitud_amistad.objects.filter((Q(user_sender = id_user) | Q(user_receptor = id_user)))
        serializer = SolicitudInfoSerializer(solicitudes, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)
