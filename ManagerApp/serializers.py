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