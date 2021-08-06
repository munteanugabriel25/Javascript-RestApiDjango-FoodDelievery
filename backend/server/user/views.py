from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import LoginSerializer, UserSerializer
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework import status, response
from django.http import JsonResponse
# Create your views here.


class UserLoginApiView(APIView):
    
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = UserSerializer(user)
        return response.Response(user_serializer.data, status=status.HTTP_200_OK)