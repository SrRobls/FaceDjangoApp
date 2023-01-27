from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import UserSerializer
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import check_password
from rest_framework.authtoken.models import Token

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
        if pk == '5':
            return Response('No se debe eliminar al admin', status=status.HTTP_401_UNAUTHORIZED)
        user = User.objects.get(id = pk)
        user.delete()
        return Response('Usuario Eliminado', status=status.HTTP_200_OK)


@api_view(['POST'])
def login(request):
    data = request.data
    user = User.objects.get(username = data['username'])
    pass_valdate = data['password']
    print(pass_valdate)
    if not user:
        return Response('Usuario no existente', status=status.HTTP_404_NOT_FOUND)
    
    pwd_valid = check_password(pass_valdate, user.password)
    if not pwd_valid:
        return Response('Contrase incorrecta', status=status.HTTP_406_NOT_ACCEPTABLE)

    token, _ = Token.objects.get_or_create(user = user)
    info_user = {
        "id": user.id,
        "username":user.username,
        "nombre":user.first_name,
        "apellido":user.last_name,
        "Token": token.key
    }

    return Response(info_user, status=status.HTTP_200_OK)
