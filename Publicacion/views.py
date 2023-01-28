from django.shortcuts import render
from rest_framework.views import APIView
from .serializer import PublicacionSerializer, PublicacionInfoSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Publicacion
from django.contrib.auth.models import User

# Create your views here.
class Publicaciones(APIView):


    def post(self, request):

        data =  request.data
        serializer = PublicacionSerializer()
        serializer.validate_user(data['user'])
        serializer.create(data)


        return Response('Publicacion creada', status=status.HTTP_201_CREATED)
    
    def get(self, request, id_user):

        try:
            user = User.objects.get(id = id_user)
        except:
            return Response('Usuario invalido o inexistente', status=status.HTTP_400_BAD_REQUEST)

        publicaciones = Publicacion.objects.filter(user_id = user)
        publicaciones = list(publicaciones)

        serializer = PublicacionInfoSerializer(publicaciones,  many = True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):

        data = request.data
        if data == {}:
            return Response({'error': 'Datos denegados'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            publicacion = Publicacion.objects.get(id = pk)
        except:
            return Response({'error': 'Publicacion inexistente o informacion denegada'},  status=status.HTTP_400_BAD_REQUEST)

        serializer = PublicacionInfoSerializer(instance = publicacion, data=data)
        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def delete(self, request, pk):

        try:
            publicacion = Publicacion.objects.get(id = pk)
        except: 
            return Response({'error': 'publicacion inexistente'}, status=status.HTTP_404_NOT_FOUND)

        publicacion.delete()
        return Response('Publicacion Eliminada', status=status.HTTP_200_OK)