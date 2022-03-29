from rest_framework import generics
from rest_framework import mixins
from api.serializers import CategorySerializer, CategorySerializer2
from rest_framework.response import Response
from api.models import Category
from django.shortcuts import Http404
class CategoryListAPIView(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset= Category.objects.all()
    serializer_class = CategorySerializer2
    def get(self, request, *args, **kwargs):    
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)



class CategoryDetailAPIView(mixins.RetrieveModelMixin,mixins.UpdateModelMixin,mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset= Category.objects.all()
    serializer_class = CategorySerializer2

    def get(self, request, *args, **kwargs):    
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

