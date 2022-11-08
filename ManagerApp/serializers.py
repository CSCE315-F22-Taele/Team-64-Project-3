from rest_framework import serializers
from ManagerApp.models import Inventory

class inventorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Inventory
        fields=('item_id', 'itemname', 'itemcount', 'itemfcount', 'itemcode')