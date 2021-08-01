from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Item
from .serializers import ItemSerializer
from django.shortcuts import get_object_or_404

# Create your views here.
class RetrieveItem(APIView):
    
    def get(self, request, id):
        item = get_object_or_404(Item, pk=id)
        serializer = ItemSerializer(item)
        return Response(serializer.data, status=status.HTTP_200_OK)