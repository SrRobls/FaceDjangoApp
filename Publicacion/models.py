from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Publicacion(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    info = models.CharField(max_length=500)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'Publicacion'
        verbose_name_plural = 'Publicaciones'
        verbose_name = 'Publicacion'
        ordering = ['-created']

    def __str__(self) -> str:
        return self.info