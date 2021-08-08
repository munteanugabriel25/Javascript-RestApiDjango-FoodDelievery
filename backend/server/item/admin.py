from django.contrib import admin
from .models import Ingredient, Item, Order, OrderItem
# Register your models here.
admin.site.register(Item)
admin.site.register(Ingredient)
admin.site.register(Order)
admin.site.register(OrderItem)
