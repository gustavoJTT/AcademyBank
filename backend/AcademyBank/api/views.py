from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import CartaoVirtual
from .serializers import CartaoVirtualSerializer

class CartaoVirtualViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciar Cartões Virtuais.
    Fornece operações CRUD completas: list, create, retrieve, update, destroy
    """
    queryset = CartaoVirtual.objects.all()
    serializer_class = CartaoVirtualSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
