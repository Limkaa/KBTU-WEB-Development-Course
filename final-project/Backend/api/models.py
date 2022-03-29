from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import User, PermissionsMixin
from django.db import models


class Category(models.Model):
    title = models.CharField(max_length=200)

    def to_json(self):
        return {
            'id': self.id,
            'title': self.title
        }

    def __str__(self):
        return f'{self.id}: {self.title}'

# class Ingredient(models.Model):
#     detail = models.CharField(max_length=500)
#     ingredients= models.CharField(max_length=500)
#     notes= models.CharField(max_length=500)

#     def to_json(self):
#         return {
#             'id':self.id,
#             'detail': self.detail,
#             'ingredients': self.ingredients,
#             'notes': self.notes
#         }

class Product(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(default='')
    image = models.CharField(max_length=1000, default="1")
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='product')
    detail = models.CharField(max_length=500, default='')
    ingredients= models.CharField(max_length=500, default='')
    notes= models.CharField(max_length=500, default='')
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.id}: {self.title}'


class Profile(models.Model):
    name = models.CharField(max_length=100)
    username = models.CharField(unique=True, max_length=100)
    phone = models.CharField(max_length=50)
    address = models.CharField(max_length=300)
    subscription = models.IntegerField(default=0)

    def __str__(self):
        return self.username


class Wish(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='wishes')
    text = models.TextField()

    def __str__(self):
        return f'{self.id}: ({self.user}): {self.text}'

    class Meta:
        verbose_name_plural = "Wishes"


class Payment(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True)
    amount = models.IntegerField()
    method = models.CharField(max_length=50)
    days = models.IntegerField()

    def __str__(self):
        return f'{self.user}: {self.amount} -- {self.days} -- {self.method}'


class Feedback(models.Model):
    email = models.EmailField()
    content = models.TextField()

    def to_json(self):
        return {
            'id': self.id,
            'email': self.email,
            'content': self.content
        }

    def __str__(self):
        return f'{self.id}: ({self.email}): {self.content}'