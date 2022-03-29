from rest_framework import generics
from rest_framework import mixins
from api.serializers import CategorySerializer2, ProductSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from api.models import Category, Product
from django.shortcuts import Http404


class CategoryListAPIView(generics.ListCreateAPIView):
    queryset= Category.objects.all()
    serializer_class = CategorySerializer2

class CategoryDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= Category.objects.all()
    serializer_class = CategorySerializer2

class CategoryProductsAPIView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        category = get_object_or_404(Category, id=self.kwargs.get('pk'))
        queryset = category.product.all()
        return queryset


class ProductListAPIView(generics.ListCreateAPIView):
    queryset= Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= Product.objects.all()
    serializer_class = ProductSerializer
