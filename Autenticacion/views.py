from datetime import datetime
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import UserSerializer, UserInfoSerializer
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.contrib.sessions.models import Session

# Create your views here.
class Autenticacion(APIView):

    # creacion de usuario
    def post(self, request):
        data_user =  request.data
        serializer = UserSerializer()
        serializer.validated_username(data_user['username'])
        serializer.create(validated_data=data_user)

        return Response('Usuario Creado', status=status.HTTP_201_CREATED)

    def delete(self, request, pk):
        # Luego cuando se monte a la base en la nube, cambiarlo por 1
        if pk == '8':
            return Response('No se debe eliminar al admin', status=status.HTTP_401_UNAUTHORIZED)
        user = User.objects.get(id = pk)
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
    def post(self, request):
        data =  request.data
        print(data)
        try:
            token = Token.objects.get(key = data['token'])
            print(token.key)
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
