from django.contrib import admin
from .models import Amistad, Solicitud_amistad, Mensaje

# Register your models here.


admin.site.register(Amistad)
admin.site.register(Solicitud_amistad)
admin.site.register(Mensaje)