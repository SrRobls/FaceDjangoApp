from django.db import models
from django.contrib.auth import get_user_model
from datetime import datetime, timedelta
User = get_user_model()

# Create your models here.
class Solicitud_amistad(models.Model):
    user_sender = models.ForeignKey(User, related_name='sender', on_delete=models.CASCADE)
    user_receptor = models.ForeignKey(User, related_name='receptor', on_delete=models.CASCADE)
    is_aceptada = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Solicitud-Amistad'
        verbose_name_plural = 'Solicitudes-Amistades'
        ordering = ['-created']
    

    def __str__(self) -> str:
        return f'{self.user_sender.username} to {self.user_receptor.username}'

# class Amistad(models.Model):
#     user = models.ForeignKey(User, related_name='user', on_delete=models.CASCADE)
#     user_amigo = models.ForeignKey(User, related_name='amigo', on_delete=models.CASCADE)

#     class Meta:
#         verbose_name = 'Amistad'
#         verbose_name_plural = 'Amistades'

class Mensaje(models.Model):
    amistad = models.ForeignKey(Solicitud_amistad, on_delete=models.CASCADE)
    enviado_por = models.ForeignKey(User, on_delete=models.CASCADE)
    mensaje = models.CharField(max_length=250)
    created = models.DateTimeField(auto_now_add=True)
    time_expire = models.DateTimeField(default= (datetime.now() + timedelta(days=5)))


    class Meta:
        verbose_name = 'Mensaje'
        verbose_name_plural = 'Mensajes'
        ordering = ['-created']
    

    def __str__(self) -> str:
        return self.mensaje