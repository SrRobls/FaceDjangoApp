# Generated by Django 4.0.6 on 2023-01-28 17:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Autenticacion', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='logoperfil',
            name='url_imagen',
            field=models.CharField(default='https://img2.freepng.es/20180401/dbq/kisspng-user-profile-computer-icons-profile-5ac09245049c32.0935523415225697970189.jpg', max_length=500),
        ),
    ]
