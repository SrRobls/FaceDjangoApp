from datetime import datetime
from django.shortcuts import render
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import UserSerializer, UserInfoSerializer
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.contrib.sessions.models import Session
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from Publicacion.models import Publicacion
from Publicacion.serializer import PublicacionInfoSerializer
from .models import LogoPerfil

# Create your views here.
class Autenticacion(APIView):

    # creacion de usuario
    def post(self, request):
        data_user =  request.data
        serializer = UserSerializer()
        serializer.validated_username(data_user['username'])
        serializer.create(validated_data=data_user)

        return Response('Usuario Creado', status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete(request, pk):
        # Luego cuando se monte a la base en la nube, cambiarlo por 1
        if pk == '8':
            return Response('No se debe eliminar al admin', status=status.HTTP_401_UNAUTHORIZED)

        authorization_header = request.META.get('HTTP_AUTHORIZATION', None).split()
        token =  Token.objects.get(key = authorization_header[1]) 


        user = User.objects.get(id = pk)
        
        if user != token.user:
            return Response('Token perteneciente a otro usuario', status=status.HTTP_401_UNAUTHORIZED)

        user.delete()
        return Response('Usuario Eliminado', status=status.HTTP_200_OK)


class Login(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        login_serializer = self.serializer_class(data = request.data, context = {request:request})
        if login_serializer.is_valid():
            user = login_serializer.validated_data['user']
            user_serializer = UserInfoSerializer(user)
            token, created = Token.objects.get_or_create(user = user)
            if created:
                return Response({
                    "token": token.key,
                    "user": user_serializer.data,
                    "message":"Inicio de sesion exitoso"
                }, status=status.HTTP_200_OK)
            else:
                # Procedemos a eliminar todas la sesiones que tenia "abierta el usuario"
                # esto lo hacemos definiendo que borre todas aquellas sesiones en la que su tiempo de epiracion sea mayor al dia actual
                token.delete()
                all_sessions = Session.objects.filter(expire_date__gte = datetime.now())
                if all_sessions.exists():
                    for session in all_sessions:
                        session_data = session.get_decoded()
                        if user.id == int(session_data.get('_auth_user_id')):
                            session.delete()
                
                token = Token.objects.create(user = user)
                return Response({
                    "token": token.key,
                    "user": user_serializer.data,
                    "message":"Inicio de sesion exitoso"
                }, status=status.HTTP_200_OK)
        else:
            return Response({"Error: Usuario o contraseña invalido"}, status=status.HTTP_400_BAD_REQUEST) 


class Logout(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        authorization_header = request.META.get('HTTP_AUTHORIZATION', None).split()
        data =  authorization_header[1]
        try:
            token = Token.objects.get(key = data)
            user = token.user
            all_sessions = Session.objects.filter(expire_date__gte = datetime.now())
            if all_sessions.exists():
                for session in all_sessions:
                    session_data = session.get_decoded()
                    if user.id == int(session_data.get('_auth_user_id')):
                        session.delete()
        
            token.delete()
            return Response({"mensaje_token": 'token Eliminado', 'sesion_manage': 'sesiones eliminadas'}, status=status.HTTP_200_OK)
            


        except:
            return Response({'error': 'token invalido'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def info_perfil_usuario(request, id_user):

    try:
        user = User.objects.get(id = id_user)
        publicaciones = Publicacion.objects.filter(user = user)
        logo = LogoPerfil.objects.get(user = user)
    except:
        return Response({'error': 'Informacion o usuario invalido'}, status=status.HTTP_400_BAD_REQUEST)
    
    serializer = PublicacionInfoSerializer(publicaciones, many = True)
    return Response({'user':  {'id': user.id, 'first_name': user.first_name, 'last_name': user.last_name, 'username': user.username, 'logo': logo.url_imagen},
                    'publicaciones': serializer.data})


