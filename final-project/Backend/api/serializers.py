from django.contrib.auth.models import User
from rest_framework import serializers

from api.models import Category, Product, Profile, Wish, Payment
from api.models import Feedback


class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField()

    def create(self, validated_data):
        category = Category.objects.create(title=validated_data.get('title'))
        return category

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title')
        instance.save()
        return instance


class CategorySerializer2(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(many = True, read_only=True)
    #StringReleated 
    class Meta:
        model= Category
        fields = ('id','title','product')


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer2(read_only=True)
    class Meta:
        model = Product
        fields = ('id', 'title', 'description', 'image', 'category','detail', 'ingredients', 'notes', 'is_active')    


class WishSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    user_id = serializers.IntegerField(write_only=True)
    text = serializers.CharField()

    def create(self, validated_data):
        wish = Wish.objects.create(user_id=validated_data.get("user_id"),
                                   text=validated_data.get("text"))
        return wish

    def update(self, instance, validated_data):
        instance.text = validated_data.get('text')
        instance.save()
        return instance


class ProfileSerializer(serializers.ModelSerializer):
    wishes = WishSerializer(many=True, read_only=True, )
    class Meta:
        model = Profile
        fields = ('id', 'name', 'phone', 'username', 'address', 'subscription', 'wishes')


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ('password', 'profile')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        username = validated_data.get("profile").get("username")
        user = User(username=username)
        user.set_password(password)
        user.save()
        return user


class PaymentSerializer(serializers.Serializer):
    user_id = serializers.IntegerField(write_only=True)
    amount = serializers.IntegerField()
    method = serializers.CharField(max_length=50)
    days = serializers.IntegerField()

    def create(self, validated_data):
        payment = Payment.objects.create(user_id=validated_data.get("user_id"),
                                         amount=validated_data.get("amount"),
                                         method=validated_data.get("method"),
                                         days=validated_data.get("days"))
        return payment

class FeedbackSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    email = serializers.EmailField()
    content = serializers.CharField(max_length=500)

    def create(self, validated_data):
        feedback = Feedback.objects.create(email=validated_data.get("email"),
                                            content=validated_data.get("content"))
        return feedback
    
    # def update(self, instance, validated_data):
    #     instance.email = validated_data.get('email')
    #     instance.content = validated_data.get('content')
    #     instance.save()
    #     return instance