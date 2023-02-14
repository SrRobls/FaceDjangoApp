from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .serializer import PublicacionSerializer, PublicacionInfoSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Publicacion
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

# Create your views here.
class Publicaciones(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def verificar_token_usuario(self, id_user, request):
        authorization_header = request.META.get('HTTP_AUTHORIZATION', None).split()
        token = Token.objects.get(key = authorization_header[1])

        if int(token.user.id) != int(id_user):
            return True


    def post(self, request):

        data =  request.data
        serializer = PublicacionSerializer()

        validar_token = self.verificar_token_usuario(data['user'], request)
        if validar_token:
            return Response({'error': 'Token perteneciente a otro usuario'}, status=status.HTTP_401_UNAUTHORIZED)

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


        validar_token = self.verificar_token_usuario(id_user, request)
        if validar_token:
            return Response({'error': 'Token perteneciente a otro usuario'}, status=status.HTTP_401_UNAUTHORIZED)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):

        data = request.data
        if data == {}:
            return Response({'error': 'Datos denegados'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            publicacion = Publicacion.objects.get(id = pk)
        except:
            return Response({'error': 'Publicacion inexistente o informacion denegada'},  status=status.HTTP_400_BAD_REQUEST)


        validar_token = self.verificar_token_usuario(data['user'], request)
        if validar_token:
            return Response({'error': 'Token perteneciente a otro usuario'}, status=status.HTTP_401_UNAUTHORIZED)       

        serializer = PublicacionInfoSerializer(instance = publicacion, data=data)
        if serializer.is_valid():
            serializer.save()


        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def delete(self, request, pk):

        try:
            publicacion = Publicacion.objects.get(id = pk)
            id_user = publicacion.user.id
        except: 
            return Response({'error': 'publicacion inexistente'}, status=status.HTTP_404_NOT_FOUND)

        validar_token = self.verificar_token_usuario(id_user, request)
        if validar_token:
            return Response({'error': 'Token perteneciente a otro usuario'}, status=status.HTTP_401_UNAUTHORIZED)    

        publicacion.delete()
        return Response('Publicacion Eliminada', status=status.HTTP_200_OK)
    

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def obtenerTodos(request):
    
    publicaciones = Publicacion.objects.all()

    serializer = PublicacionInfoSerializer(publicaciones,  many = True)
    print(serializer.data)

    return Response(serializer.data, status=status.HTTP_200_OK)