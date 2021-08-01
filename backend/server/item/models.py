from django.db import models
import uuid


# Create your models here.
def item_media_path(instance, filename):
    return 'item_pics/{0}/{1}'.format(instance.name, filename)

class Ingredient(models.Model):
    UNIT = [("grams", "g"),
            ("piece", "pc"),
            ("milliliters", "ml"),
            ("undefined", " "),
            ("table_spoon", "tsp"),
            ("cup", "cup")
            ]
    name = models.CharField(max_length=15, blank=False)
    unit = models.CharField(max_length=100, choices=UNIT, default="undefined")
    quantity = models.CharField(max_length=8, blank=False)
    
    def __str__(self):
        return self.name
    
class Item(models.Model):
    CATEGORY = [("pizza", "Pizza"),
                ("soups", "Soups"),
                ("drinks", "Drinks"),
                ("others", "Others")
                ]
    
    name = models.CharField(max_length=14, blank=False, default="undefined")
    price = models.FloatField(blank=False, default=0)
    calories = models.IntegerField(blank=True, default=100)
    id = models.CharField(max_length=20, blank=True, unique=True, primary_key=True)
    image = models.FileField(upload_to=item_media_path, default="def.jpg")
    spicy = models.IntegerField(default=1)
    ingredients = models.ForeignKey(Ingredient, on_delete=models.CASCADE, default=1)
    category = models.CharField(max_length=120, choices=CATEGORY, default="others")
    
    def save(self, *args, **kwargs):
        uuid_id = str(uuid.uuid4()).replace("-", "")[:20]
        self.id = uuid_id
        self.name = self.name.title()
        super(Item, self).save(*args, **kwargs)
        
    def __str__(self):
        return self.name


