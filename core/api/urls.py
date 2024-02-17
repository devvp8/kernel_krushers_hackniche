from django.urls import path,include
from .views import *

urlpatterns = [
    path('querygenerate/',QueryGeneratorView.as_view(),name='list-room'),
]

