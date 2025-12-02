from rest_framework import serializers
from .models import CartaoVirtual

class CartaoVirtualSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartaoVirtual
        fields = ['id', 'nome_cartao', 'limite', 'ativo', 'criado_em', 'atualizado_em']
        read_only_fields = ['criado_em', 'atualizado_em']
