from rest_framework import serializers
from .models import Item, Ingredient, Order, OrderItem


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = "__all__"

class IngredientSerializerShort(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ["name"]


class ItemSerializer (serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True)
    image = serializers.SerializerMethodField()
    class Meta:
        model = Item
        fields = "__all__"
        
    def get_image(self, object):
        request = self.context["request"]
        picture_url = object.image.url
        absolute_url = request.build_absolute_uri(picture_url)
        return absolute_url


class SearchSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializerShort(many=True)
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Item
        exclude = ["calories", "description", "category"]

    def get_image(self, object):
        request = self.context["request"]
        picture_url = object.image.url
        absolute_url = request.build_absolute_uri(picture_url)
        return absolute_url


class OrderItemSerializer(serializers.ModelSerializer):
    item = serializers.StringRelatedField(many=True)
    
    class Meta:
        model = OrderItem
        fields = ["id", "item", "quantity"]
    
    
class OrderSerializer(serializers.ModelSerializer):
    
    items = OrderItemSerializer(many=True)
    
    class Meta:
        model = Order
        fields = "__all__"
    depth = 2