from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf  import settings
from .models import Profile



@receiver(post_save,sender = settings.AUTH_USER_MODEL)
def add_to_profile(sender,created,instance,**kwargs):
    if created:
        profile_c = Profile.objects.get(gc_id = instance.school_id)
        if profile_c != None:
            profile_c.user = instance
            profile_c.save()
