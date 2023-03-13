from rest_framework import serializers
from .models import Profile,Image


class ProfileSerializer(serializers.ModelSerializer):
    class   Meta:
        model = Profile
        fields = ['id','user','gc_name','image','gc_id']



class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['image','page_no']


class MiddleSerializer(serializers.Serializer):
    name = serializers.CharField(max_length = 225)
    student_id = serializers.CharField(max_length = 225)