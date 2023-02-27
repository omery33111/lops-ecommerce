from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import BasePermission

from .models import Review


from .serializers import ReviewSerializer



class IsStaff(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_staff


# ------------------------- REVIEWS START ------------------------- #
@api_view(['GET'])
def reviews_product(request, pk = -1):
    reviews = Review.objects.filter(product_id = pk)
    serializer = ReviewSerializer(reviews, many = True)
    return Response(serializer.data)



@api_view(['GET'])
def reviews_peruser(request, pk = -1):
    reviews = Review.objects.filter(user_id = pk)
    serializer = ReviewSerializer(reviews, many = True)
    return Response(serializer.data)


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def reviews_user(request, pk = -1):
    if request.method == "GET":
        user = request.user
        user_reviews = user.review_set.all()
        serializer = ReviewSerializer(user_reviews, many = True)
        return Response(serializer.data, status = status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def review_post(request):
    serializer = ReviewSerializer(data = request.data, context = {"user": request.user})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsStaff])
def review_delete(request, pk = -1):
    review = Review.objects.get(pk = pk)
    review.delete()
    return Response(status = status.HTTP_204_NO_CONTENT)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def review_userdelete(request, pk = -1):
    review = Review.objects.get(pk = pk)
    review.delete()
    return Response(status = status.HTTP_204_NO_CONTENT)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def review_update(request, pk = -1):
    if request.method == "PUT":
        review = Review.objects.get(pk = pk)
        serializer = ReviewSerializer(review, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
# ------------------------- REVIEWS START ------------------------- #
