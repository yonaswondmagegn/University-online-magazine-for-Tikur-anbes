from django.urls import path 
from .views import ProfileViewSet,ImageViewSet,home,middle,album,albumview
from rest_framework import routers 

router = routers.DefaultRouter()
router.register('images',ImageViewSet)
router.register('prof', ProfileViewSet)


urlpatterns = [
    path('mid/',middle,name='middle'),
    path('mid/album/', albumview,name='album view'),
    path('home/',home,name='home'),
    path('home/album', album,name='album'),

]+router.urls