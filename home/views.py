from django.shortcuts import render,get_object_or_404
from rest_framework.views import APIView
from rest_framework.decorators import permission_classes,action,api_view
from rest_framework import status
from .models import Profile,Image
from .serializer import ProfileSerializer,ImageSerializer,MiddleSerializer
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet,ModelViewSet
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.fields import CurrentUserDefault
from core.models import User


class ProfileViewSet(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
   



class ImageViewSet(ReadOnlyModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

def home(request):
    return render(request,'home/home.html')

def album(request):
    return render(request,'home/main.html')

@api_view(['POST','GET'])
def middle(request):
    if request.method == 'GET':
        return Response('ok')
    
    if request.method == 'POST':
        print('working..........')
        print(request.data)
        username = request.data['user_name']
        user_id = request.data['user_id']

        profile = Profile.objects.get(gc_id = user_id)
        if profile != None:
            if profile.gc_name == username:
                serialized = ProfileSerializer(profile)
                return Response(serialized.data)
            else:
                return Response('cant get',status=status.HTTP_404_NOT_FOUND)
        else:
                return Response('cant get',status=status.HTTP_404_NOT_FOUND)
        

@api_view(['POST'])
def albumview(request):
    if request.method == 'POST':
        print(request.data)
        user_id =int(request.data['idd'])
        print(user_id)
        cur_user = User.objects.get(id = user_id)
        profile = Profile.objects.get(user = cur_user)
        if profile != None:
            serializer = ProfileSerializer(profile)
            return Response(serializer.data)
        
    