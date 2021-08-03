from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Item
from .serializers import ItemSerializer, SearchSerializer
from django.shortcuts import get_object_or_404


# Create your views here.
class RetrieveItemView(APIView):
    def get(self, request, id):
        item = get_object_or_404(Item, pk=id)
        serializer = ItemSerializer(item, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class SearchItemView(APIView):
    def get(self, request):
        query = request.GET.get("search", "")
        data = Item.objects.all()
        if query == "":
            serializer = SearchSerializer(data, many=True, context={"request": request})
        else:
            serializer = SearchSerializer(data, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class ListCategoryView(APIView):
    
    def get(self, request, category):
        query = Item.objects.category_item(category)
        serializer = SearchSerializer(query, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)
        