from rest_framework.decorators import api_view

from api.models import Product, Profile, Wish, Payment
from api.models import Category
from api.models import Feedback
from api.serializers import CategorySerializer, CategorySerializer2, ProfileSerializer, UserSerializer, \
    PaymentSerializer, FeedbackSerializer
from rest_framework.response import Response

@api_view(['GET', 'POST'])
def category_list(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer2(categories, many = True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CategorySerializer2(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

@api_view(['GET', 'PUT', 'DELETE'])
def category_detail(request, category_id):
    try:
        category = Category.objects.get(id=category_id)
    except Category.DoesNotExist as e:
        return Response({'message': str(e)}, status=400)
    if request.method =='GET':
        serializer = CategorySerializer2(category)
        return Response(serializer.data)
    elif request.method=='PUT':
        serializer = CategorySerializer2(instance=category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    elif request.method == 'DELETE':
        category.delete()
        return Response({'message': 'deleted'}, status =200)


@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data = request.data)
    serializer_profile = ProfileSerializer(data = request.data.get("profile"))
    if serializer.is_valid() and serializer_profile.is_valid():
        serializer.save()
        serializer_profile.save()
        return Response(serializer_profile.data)
    return Response(serializer.errors)


@api_view(['GET'])
def account(request):
    try:
        profile = Profile.objects.get(username=request.user.username)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    except Profile.DoesNotExist as e:
        return Response({'message': str(e)}, status=400)


@api_view(['POST'])
def payment(request):
    try:
        user = Profile.objects.get(username=request.user.username)
    except Profile.DoesNotExist as e:
        return Response({'message': str(e)}, status=400)

    request.data.update({'user_id': user.id})
    serializer = PaymentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user.subscription += serializer.data.get('days')
        user.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['GET', 'POST'])
def feedbacks_list(request):
    if request.method == 'GET':
        feedbacks = Feedback.objects.all()
        serializer = FeedbackSerializer(feedbacks, many = True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = FeedbackSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)
