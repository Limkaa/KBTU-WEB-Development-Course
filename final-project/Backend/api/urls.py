from django.urls import path
from api.views import CategoryListAPIView, CategoryDetailAPIView, ProductListAPIView, ProductDetailAPIView, CategoryProductsAPIView 
from rest_framework_jwt.views import obtain_jwt_token

from api.views.views_cbv import WishAPIView
from api.views.views_fbv import register, account, payment, feedbacks_list

urlpatterns = [
    #path('categories/', category_list),
    #path('categories/<int:category_id>/', category_detail),
    #path('product/', product_list),
    #path('product/<int:product_id>/', product_detail),    
    path('categories/', CategoryListAPIView.as_view()),
    path('categories/<int:pk>/', CategoryDetailAPIView.as_view()),
    path('categories/<int:pk>/product', CategoryProductsAPIView.as_view()),
    path('categories/<int:pk>/product/<int:pk2>/', CategoryProductsAPIView.as_view()),
    path('product/',  ProductListAPIView.as_view()),
    path('product/<int:pk>', ProductDetailAPIView.as_view()),    
    path('login/', obtain_jwt_token),
    path('register/', register),
    path('account/', account),
    path('payment/', payment),
    path('wish/', WishAPIView.as_view()),
    path('wish/<int:pk>/', WishAPIView.as_view()),
    path('feedback/', feedbacks_list)
]

