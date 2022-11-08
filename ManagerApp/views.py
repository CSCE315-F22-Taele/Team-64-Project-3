from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from ManagerApp.models import Inventory, Menu
from ManagerApp.serializers import inventorySerializer, menuSerializer

# Create your views here.

@csrf_exempt
def inventoryApi(request, id=0):
    if request.method == 'GET':
        if id == 0:
            inv = Inventory.objects.order_by('item_id').all()
        else:
            inv = Inventory.objects.filter(item_id=id)
        inv_serializer = inventorySerializer(inv, many=True)
        return JsonResponse(inv_serializer.data, safe=False)
    elif request.method == 'POST':
        inv_data = JSONParser().parse(request)
        inv_serializer = inventorySerializer(data=inv_data)
        if inv_serializer.is_valid():
            inv_serializer.save()
            return JsonResponse("Added Successfully!", safe=False)
        return JsonResponse("Failed to add.", safe=False)
    elif request.method == 'PUT':
        inv_data = JSONParser().parse(request)
        inv = Inventory.objects.get(item_id=inv_data['item_id'])
        inv_serializer = inventorySerializer(inv, data=inv_data)
        if inv_serializer.is_valid():
            inv_serializer.save()
            return JsonResponse("Updated Successfully!", safe=False)
        return JsonResponse("Failed to update.", safe=False)
    elif request.method == 'DELETE':
        inv = Inventory.objects.get(item_id=id)
        inv.delete()
        return JsonResponse("Delete Successfull!", safe=False)

@csrf_exempt
def menuApi(request, id=0):
    if request.method == 'GET':
        if id == 0:
            menu = Menu.objects.order_by('food_id').all()
        else:
            menu = Menu.objects.filter(food_id=id)
        menu_serializer = menuSerializer(menu, many=True)
        return JsonResponse(menu_serializer.data, safe=False)
    elif request.method == 'POST':
        menu_data = JSONParser().parse(request)
        menu_serializer = menuSerializer(data=menu_data)
        if menu_serializer.is_valid():
            menu_serializer.save()
            return JsonResponse("Added Successfully!", safe=False)
        return JsonResponse("Failed to add.", safe=False)
    elif request.method == 'PUT':
        menu_data = JSONParser().parse(request)
        menu = Menu.objects.get(food_id=menu_data['food_id'])
        menu_serializer = menuSerializer(menu, data=menu_data)
        if menu_serializer.is_valid():
            menu_serializer.save()
            return JsonResponse("Updated Successfully!", safe=False)
        return JsonResponse("Failed to update.", safe=False)
    elif request.method == 'DELETE':
        menu = Menu.objects.get(food_id=id)
        menu.delete()
        return JsonResponse("Delete Successfull!", safe=False)


@csrf_exempt
def inventoryCountApi(request, count=0):
    if request.method=='GET':
        if count == 0:
            inv=Inventory.objects.all()
        else:
            inv=Inventory.objects.filter(itemcount__lte=count)
        inv_serializer=inventorySerializer(inv, many=True)
        return JsonResponse(inv_serializer.data, safe=False)