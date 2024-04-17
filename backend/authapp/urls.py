from django.urls import path
from .views import *

urlpatterns = [
    # path('register/', register, name='register'),
    path('login/', MyTokenObtainPairView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('', getRoutes),
]
