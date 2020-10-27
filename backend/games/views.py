from rest_framework import generics

from .models import Tag, Source
from .serializers import TagSerializer, SourceSerializer


class SourceList(generics.ListCreateAPIView):
    queryset = Source.objects.all()
    serializer_class = SourceSerializer


class SourceDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Source.objects.all()
    serializer_class = SourceSerializer


class TagList(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class TagDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
