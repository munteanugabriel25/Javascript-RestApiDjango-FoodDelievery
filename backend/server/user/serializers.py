from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from rest_framework.authtoken.models import Token

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    
    def validate(self, data):
        username = data.get("username")
        password = data.get("password")
        if username is None or password is None:
            raise serializers.ValidationError("Must provide username/password combination")
        user = authenticate(username=username, password=password)
        if user is None:
            raise serializers.ValidationError("Unable to log in. User not found or password wrong")
        data["user"] = user
        return data
    
    
class UserSerializer(serializers.ModelSerializer):
    
    token = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['username', 'token', 'id']
    
    def get_token(self, object):
        token = Token.objects.get(user=object)
        return token.key
    