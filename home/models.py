from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.conf import settings


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,
                                on_delete=models.SET_NULL,
                                blank=True,
                                null=True)
    gc_name = models.CharField(max_length=225,null=True)
    image = models.ImageField(upload_to='profile_pics',default='default.jpg')
    gc_id = models.CharField(max_length=7,null= True)
    date = models.DateTimeField(default=timezone.now)



class Image(models.Model):
    image = models.ImageField(upload_to='page_pics')
    page_no = models.IntegerField()