from django.db import models
import uuid
from django.db.models import Q
from django.contrib.auth.models import User


# Create your models here.
def item_media_path(instance, filename):
    return 'item_pics/{0}/{1}'.format(instance.name, filename)


def generate_random_id():
    uuid_id = str(uuid.uuid4()).replace("-", "")[:20]
    return uuid_id


class ItemManager(models.Manager):
    def category_item(self, category):
        return self.filter(category=category)
    
    def search_item(self, query):
        query = self.filter(Q(name__contains=query) | Q(ingredients__name__contains=query)).distinct()
        return query


class Item(models.Model):
    CATEGORY = [("Pizza", "pizza"),
                ("Soups", "soups"),
                ("Drinks", "drinks"),
                ("Others", "others")
                ]
    name = models.CharField(max_length=20, blank=False, default="undefined")
    price = models.FloatField(blank=False, default=0)
    calories = models.IntegerField(blank=True, default=100)
    id = models.CharField(max_length=20, blank=True, unique=True, primary_key=True, default=generate_random_id)
    image = models.FileField(upload_to=item_media_path, default="def.jpg")
    spicy = models.IntegerField(default=1)
    description = models.CharField(max_length=250, default='')
    category = models.CharField(max_length=120, choices=CATEGORY, default="others")
    
    # def save(self, *args, **kwargs):
    #     uuid_id = str(uuid.uuid4()).replace("-", "")[:20]
    #     self.id = uuid_id
    #     self.name = self.name.title()
    #     super(Item, self).save(*args, **kwargs)
    
    objects = ItemManager()
    
    def __str__(self):
        return self.name


class Ingredient(models.Model):
    UNIT = [("g", "grams"),
            ("pc", "piece"),
            ("ml", "milliliters"),
            (" ", "undefined"),
            ("tsp", "table_spoon"),
            ("cup", "cup")
            ]
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="ingredients", default=1)
    name = models.CharField(max_length=15, blank=False)
    unit = models.CharField(max_length=100, choices=UNIT, default="undefined")
    quantity = models.CharField(max_length=8, blank=False)
    
    def __str__(self):
        return self.name


class OrderManager(models.Manager):
    def get_total_value(self):
        print("done")
    
    def get_total_items(self):
        pass


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    created = models.DateTimeField(auto_now_add=True)
    total_value = models.FloatField(blank=True, default=0)
    total_items = models.IntegerField(blank=True, default=0)

    objects = OrderManager()
    
    def __str__(self):
        return 'order No.{} total value of {}'.format(self.id, self.total_value)

    def update_value_items(self, *args, **kwargs):
        total_value = 0
        total_items = len(self.items.all())
        for item in self.items.all():
            total_value += (item.quantity*item.item.values_list()[0][1])
            self.total_value = total_value
            self.total_items = total_items
            self.save()
            
            
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    item = models.ManyToManyField(Item)
    quantity = models.IntegerField(blank=False)
    
