from rest_framework import serializers
from ManagerApp.models import Inventory, Menu, Lowinventory

class inventorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Inventory
        fields=('item_id', 'itemname', 'itemcount', 'itemfcount', 'itemcode')

class menuSerializer(serializers.ModelSerializer):
    class Meta:
        model=Menu
        fields=('food_id', 'menuitem', 'price', 'ingredients')

class lowInvSerializer(serializers.ModelSerializer):
    class Meta:
        model=Lowinventory
        fields=('priority_id', 'item_id')

class comboItemSerializer(serializers.Serializer):
    combo=serializers.CharField(max_length=200)
    count=serializers.IntegerField(max_value=100)