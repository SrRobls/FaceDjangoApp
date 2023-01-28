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
    
    def get(self, request, id):

        try:
            user = User.objects.get(id = id)
        except:
            return Response('Usuario invalido o inexistente', status=status.HTTP_400_BAD_REQUEST)

        publicaciones = Publicacion.objects.filter(user_id = user)
        publicaciones = list(publicaciones)

        serializer = PublicacionInfoSerializer(publicaciones,  many = True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        return
    
    def delete(self, request):
        return