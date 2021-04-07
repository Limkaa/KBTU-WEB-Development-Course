from django.shortcuts import render
from django.http.response import  HttpResponse, JsonResponse
from django.http.request import HttpRequest

from api.models import Product, Category

# Create your views here.
def products_list(request):
    products = Product.objects.all()
    products_json = [product.to_json() for product in products]
    return JsonResponse(products_json, safe=False)

def product_detail(request, id):
    try:
        product = Product.objects.get(id=id)
    except Exception as e:
        return JsonResponse({'message': str(e)}, status=400)

    return JsonResponse(product.to_json())

def categories_list(request):
    categories = Category.objects.all()
    categories_json = [category.to_json() for category in categories]
    response =  JsonResponse(categories_json, safe=False)
    response["Access-Control-Allow-Origin"] = "*"
    return response

def category_detail(request, id):
    try:
        category = Category.objects.get(id=id)
    except Exception as e:
        return JsonResponse({'message': str(e)}, status=400)

    return JsonResponse(category.to_json())