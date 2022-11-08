from django.urls import re_path
from ManagerApp import views

urlpatterns = [
    re_path(r'^inventory$', views.inventoryApi),
    re_path(r'^inventory/([0-9]+)$', views.inventoryApi),
    re_path(r'^inventory/count/([0-9]+)$', views.inventoryCountApi),
    re_path(r'^menu$', views.menuApi),
    re_path(r'^menu/([0-9]+)$', views.menuApi)
]