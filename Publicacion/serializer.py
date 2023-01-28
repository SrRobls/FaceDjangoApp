from rest_framework import serializers
from .models import Publicacion
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status

class PublicacionSerializer(serializers.Serializer):

    user = serializers.CharField()
    info = serializers.CharField()


    def create(self, validated_data):
        publicacion = Publicacion()

        publicacion.user_id = validated_data.get('user')
        publicacion.info = validated_data.get('info')
        publicacion.save()

        return publicacion

    def validate_user(self, user):

         
        user = User.objects.filter(id = user)

        if len(user) == 0:

            raise serializers.ValidationError('Usuario invalido')


class PublicacionInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Publicacion
        fields = '__all__'