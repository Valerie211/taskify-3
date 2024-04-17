from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import *
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import *
from rest_framework import generics
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.views import TokenObtainPairView

User = get_user_model()

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        user = request.user  # Obtain authenticated user from request object
        if user.is_authenticated:
            # Add additional data to the response
            data = response.data
            data['email'] = user.email
            data['username'] = user.username
            data['project_manager'] = user.is_superuser
            data['first_name'] = user.first_name
            data['last_name'] = user.last_name
            # Add other fields as needed
            return Response(data)
        return response

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/login/',
        '/api/token/refresh/'
    ]
    return Response(routes)

class RegisterView(generics.CreateAPIView):

    # this the params
    #     {
    #     "username": "frank",
    #     "first_name": "Johns",
    #     "last_name": "Does",
    #     "country": "United States",
    #     "phone": "1234567890",
    #     "email": "info@example.com",
    #     "is_superuser": true,
    #     "password": "francis1@mail"
    # }
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['POST'])
# def login(request):
#     username = request.data.get('username')
#     password = request.data.get('password')

#     user = User.objects.filter(username=username).first()  # Authenticate against CustomUser model

#     if user is not None and user.check_password(password):  # Check password using check_password method
#         token, created = Token.objects.get_or_create(user=user)
#         return Response({'token': token.key}, status=status.HTTP_200_OK)
#     else:
#         return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# @api_view(['POST'])
# def login(request):
#     username = request.data.get('username')
#     password = request.data.get('password')

#     user = User.objects.filter(username=username).first()

#     if user is not None and user.check_password(password):
#         jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
#         jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

#         payload = jwt_payload_handler(user)
#         token = jwt_encode_handler(payload)

#         return Response({'token': token}, status=status.HTTP_200_OK)
#     else:
#         return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# @api_view(['POST'])
# def login(request):
#     username = request.data.get('username')
#     password = request.data.get('password')

#     user = User.objects.filter(username=username).first()

#     if user is not None and user.check_password(password):
#         # Generate access token using Simple JWT
#         access_token = AccessToken.for_user(user)

#         return Response({'token': str(access_token)}, status=status.HTTP_200_OK)
#     else:
#         return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

