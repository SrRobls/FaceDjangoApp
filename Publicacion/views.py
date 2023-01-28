from django.shortcuts import render
from rest_framework.views import APIView
from .serializer import PublicacionSerializer
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class Publicaciones(APIView):

    def post(self, request):

        data =  request.data
        serializer = PublicacionSerializer()
        serializer.validate_user(data['user'])
        serializer.create(data)


        return Response('Publicacion creada', status=status.HTTP_201_CREATED)
    
    def get(self, request):
        return

    def put(self, request):
        return
    
    def delete(self, request):
        return