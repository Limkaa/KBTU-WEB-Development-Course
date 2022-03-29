from django.contrib import admin

from api.models import Category, Product, Feedback

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Feedback)