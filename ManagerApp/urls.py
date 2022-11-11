from django.urls import re_path
from ManagerApp import views

urlpatterns = [
    re_path(r'^manager/inventory$', views.inventoryApi),
    re_path(r'^manager/inventory/([0-9]+)$', views.inventoryApi),
    re_path(r'^manager/menu$', views.menuApi),
    re_path(r'^manager/menu/([0-9]+)$', views.menuApi),
    re_path(r'^manager/lowinventory$', views.lowInventoryApi),
    re_path(r'^manager/lowinventory/([0-9]+)$', views.lowInventoryApi),
    re_path(r'^manager/comboreport$', views.comboReportApi),
    re_path(r'^manager/salesreport$', views.salesReportApi),
    re_path(r'^manager/excessreport$', views.excessReportApi),
    re_path(r'^manager/restockreport$', views.restockReportApi),
]