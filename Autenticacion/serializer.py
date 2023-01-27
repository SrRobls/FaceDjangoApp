from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class UserSerializer(serializers.Serializer):

    username = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()

    def create(self, validated_data):
        print(validated_data)
        user = User()
        user.username = validated_data.get('username')
        user.first_name = validated_data.get('first_name')
        user.last_name = validated_data.get('last_name')
        user.email = validated_data.get('email')
        user.last_login = validated_data.get('logo_perfil')
        user.set_password(validated_data.get('password'))
        user.save()
        token = Token.objects.create(user = user)
        return user
        
    def validated_username(self, data):
        user = User.objects.filter(username = data)
        if len(user) > 0:
            raise serializers.ValidationError('Username existente')
        else:
            return data 