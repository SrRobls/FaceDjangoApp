from rest_framework import serializers
from django.contrib.auth.models import User
from .models import LogoPerfil

class UserSerializer(serializers.Serializer):

    username = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()

    def create(self, validated_data):
        user = User()
        logo = LogoPerfil()
        user.username = validated_data.get('username')
        user.first_name = validated_data.get('first_name')
        user.last_name = validated_data.get('last_name')
        user.email = validated_data.get('email')
        # user.last_login = validated_data.get('logo_perfil')
        user.set_password(validated_data.get('password'))       
        user.save()
        logo.user = user
        if validated_data.get('ulr_imagen'):
            logo.url_imagen = validated_data.get('ulr_imagen')
        else:
            logo.url_imagen = "https://img2.freepng.es/20180401/dbq/kisspng-user-profile-computer-icons-profile-5ac09245049c32.0935523415225697970189.jpg"
        logo.save()
        return user
        
    def validated_username(self, data):
        user = User.objects.filter(username = data)
        if len(user) > 0:
            raise serializers.ValidationError('Username existente')
        else:
            return data

class UserInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name'] 


