from django.shortcuts import render
from rest_framework.views import APIView
from .models import Solicitud_amistad
from .serializer import SolicitudSerializer, SolicitudInfoSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.db.models import Q


# Create your views here.


class Solicitud(APIView):


    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        serializer = SolicitudSerializer()
        serializer.create(validated_data = data)

        return Response('Solicitud enviada!', status=status.HTTP_201_CREATED)
    
    def delete(self, request, id_solicitud):

        try:
            solicitud = Solicitud_amistad.objects.get(id = id_solicitud)
        except:
            return Response({'rrror': 'id solicitud invalida'})

        solicitud.delete()

        return Response('Solicitud Eliminada', status=status.HTTP_200_OK)
    

    def put(self, request, id_solicitud):

        try:
            solicitud = Solicitud_amistad.objects.get(id = id_solicitud)
        except:
            return Response({'error': 'id solicitud invalida'})

        solicitud.is_aceptada = True
        solicitud.save()
        serializer = SolicitudInfoSerializer(solicitud)
        return Response({'Solicitud aceptada!': serializer.data}, status=status.HTTP_200_OK)
    
    def get(self, request, id_user):

        solicitudes = Solicitud_amistad.objects.filter(Q(user_sender = id_user) | Q(user_receptor = id_user))
        serializer = SolicitudInfoSerializer(solicitudes, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)
