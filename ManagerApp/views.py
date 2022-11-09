from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from ManagerApp.models import Inventory, Menu, Lowinventory, Orderhistory, Orderdetails
from ManagerApp.serializers import inventorySerializer, menuSerializer, lowInvSerializer, comboItemSerializer

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
def lowInventoryApi(request, id=0):
    if request.method == 'GET':
        lowInv = Lowinventory.objects.order_by('priority_id').all()
        lowInv_serializer = lowInvSerializer(lowInv, many=True)
        return JsonResponse(lowInv_serializer.data, safe=False)
    elif request.method == 'POST':
        lowInv_data = JSONParser().parse(request)
        lowInv_serializer = lowInvSerializer(data=lowInv_data)
        if lowInv_serializer.is_valid():
            lowInv_serializer.save()
            return JsonResponse("Added Successfully!", safe=False)
        return JsonResponse("Failed to add.", safe=False)
    elif request.method == 'DELETE':
        lowInv = Lowinventory.objects.get(priority_id=id)
        lowInv.delete()
        return JsonResponse("Delete Successfull!", safe=False)

def comboReportApi(request):
    if request.method == 'GET':
        start = request.GET['start']
        end = request.GET['end']
        if start == "" and end == "":
            return JsonResponse("Invalid date/time(s) provided.", safe=False)
        ohquery = "SELECT * FROM orderhistory WHERE time_stamp >= '" + start + "' AND time_stamp <= '" + end + "'"
        menuquery = "SELECT * FROM menu ORDER BY food_id"
        orderHistory = Orderhistory.objects.raw(ohquery)
        menuItems = Menu.objects.raw(menuquery)
        map = {}
        class ComboItem:
            def __init__(self, combo, count):
                self.combo = combo
                self.count = count
            def __str__(self):
                return self.combo + ", " + str(self.count)
            def __repr__(self):
                return self.__str__()
        for p in orderHistory:
            # print(p.order_id, p.time_stamp)
            id = p.order_id
            odquery = "SELECT * FROM orderdetails WHERE order_id = " + str(id)
            odItems = Orderdetails.objects.raw(odquery)
            ids = [x.food_id for x in odItems]
            ids.sort()
            for i in range(len(ids)):
                for j in range(i+1, len(ids)):
                    key = str(ids[i]) + " " + str(ids[j])
                    if key in map:
                        # map -> <key, (str, int)>
                        # map[key] = (map[key][0], map[key][1]+1)
                        map[key] = ComboItem(map[key].combo, map[key].count+1)
                    else:
                        newKey = menuItems[ids[i]].menuitem + " and " + menuItems[ids[j]].menuitem
                        map[key] = ComboItem(newKey, 1)
        pairs = [map[x] for x in map]
        pairs.sort(key=lambda x: -x.count)
        print(pairs)
        pairs_serializer = comboItemSerializer(pairs, many=True)
        return JsonResponse(pairs_serializer.data, safe=False)
        #return JsonResponse("test", safe=False)

@csrf_exempt
def inventoryCountApi(request, count=0):
    if request.method=='GET':
        if count == 0:
            inv=Inventory.objects.all()
        else:
            inv=Inventory.objects.filter(itemcount__lte=count)
        inv_serializer=inventorySerializer(inv, many=True)
        return JsonResponse(inv_serializer.data, safe=False)