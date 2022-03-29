from django.shortcuts import render

from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from api.models import Product
from api.models import Category

from api.serializers import CategorySerializer, CategorySerializer2


def product_list(request):
    products = Product.objects.all()    
    products_json = [product.to_json() for product in products]
    return JsonResponse(products_json, safe=False)


def product_detail(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist as e:
        return JsonResponse({'message': str(e)}, status=400)
    return JsonResponse(product.to_json())


@csrf_exempt
def category_list(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer2(categories, many = True)
        return JsonResponse(serializer.data, safe = False)
    elif request.method == 'POST':
        data = json.loads(request.body)
        serializer = CategorySerializer2(data = data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors)


@csrf_exempt
def category_detail(request, category_id):
    try:
        category = Category.objects.get(id=category_id)
    except Category.DoesNotExist as e:
        return JsonResponse({'message': str(e)}, status=400)
    if request.method =='GET':
        serializer = CategorySerializer2(category)
        return JsonResponse(serializer.data)
    elif request.method=='PUT':
        data = json.loads(request.body)
        serializer = CategorySerializer2(instance=category, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors)
    elif request.method == 'DELETE':
        category.delete()
        return JsonResponse({'message': 'deleted'}, status =200)

    




    