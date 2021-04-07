from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=300)

    def __str__(self):
        return self.name

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }

class Product(models.Model):
    name = models.CharField(max_length=300)
    category = models.ForeignKey(Category, default=None, on_delete=models.CASCADE)
    price = models.FloatField(default=0)
    description = models.TextField()
    count = models.IntegerField()
    is_active = models.BooleanField(default=False)
    rating = models.FloatField(default=0)
    likes = models.IntegerField(default=0)
    link = models.TextField()
    image_url = models.TextField()

    def __str__(self):
        return (self.name + f" ({self.category.name})")

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': {
                'id': self.category.id,
                'name': self.category.name
            },
            'price': self.price,
            'description': self.description,
            'count': self.count,
            'is_active': self.is_active,
            'rating': self.rating,
            'likes': self.likes,
            'link': self.link,
            'image_url': self.image_url
        }