from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    school_id  = models.CharField(max_length=225,null=True)
