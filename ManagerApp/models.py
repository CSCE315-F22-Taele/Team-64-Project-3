from django.db import models

# Create your models here.

class Inventory(models.Model):
    item_id = models.AutoField(primary_key=True)
    itemname = models.CharField(max_length=50)
    itemcount = models.IntegerField()
    itemfcount = models.IntegerField()
    itemcode = models.CharField(max_length=3, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'inventory'
    
class Menu(models.Model):
    food_id = models.AutoField(primary_key=True)
    menuitem = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    ingredients = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'menu'