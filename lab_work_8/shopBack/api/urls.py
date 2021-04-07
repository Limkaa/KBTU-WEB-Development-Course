from django.contrib import admin
from django.urls import path

from api.views import *

urlpatterns = [
    path('products/', products_list),
    path('products/<int:id>/', product_detail),
    path('categories/', categories_list),
    path('categories/<int:id>/', category_detail)
]