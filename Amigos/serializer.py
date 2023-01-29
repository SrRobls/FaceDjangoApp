from rest_framework import serializers
from .models import Solicitud_amistad
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.db.models import Q


class SolicitudSerializer(serializers.Serializer):

    user_sender = serializers.CharField()
    user_receptor = serializers.CharField()


    def create(self, validated_data):
        validacion = self.validar_solicitud(validated_data)

        solicitud = Solicitud_amistad()
        solicitud.user_sender = validacion[0]
        solicitud.user_receptor = validacion[1]
        solicitud.save()
        return solicitud
    
    def validar_solicitud(self, data):
        user_sender = data.get('user_sender')
        user_receptor = data.get('user_receptor')

        try:
            user_sender = User.objects.get(id = user_sender)
            user_receptor = User.objects.get(id = user_receptor)
        except:
            raise serializers.ValidationError({'error': 'Usuario/s invalido'})

        solicitudes_usaurios = Solicitud_amistad.objects.filter(Q(user_sender = user_sender.id, user_receptor = user_receptor.id) 
                                                                | Q(user_sender = user_receptor.id, user_receptor = user_sender.id))   
        if list(solicitudes_usaurios) != []:
            raise serializers.ValidationError({'error': 'Ya existe una solicitud o amistad entre los usuarios'})
        
        if user_sender == user_receptor:
            raise serializers.ValidationError({'error': 'Invalido, no se puede enviar la solicitud a si mismo'})
        
        return (user_sender, user_receptor)


class SolicitudInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Solicitud_amistad
        fields = '__all__'
        