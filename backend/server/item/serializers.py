from rest_framework import serializers
from .models import Item, Ingredient


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = "__all__"

class ItemSerializer (serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True)
    class Meta:
        model = Item
        fields = "__all__"
