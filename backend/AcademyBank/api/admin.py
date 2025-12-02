from django.contrib import admin
from .models import CartaoVirtual

@admin.register(CartaoVirtual)
class CartaoVirtualAdmin(admin.ModelAdmin):
    list_display = ['id', 'nome_cartao', 'limite', 'ativo', 'criado_em', 'atualizado_em']
    list_filter = ['ativo', 'criado_em']
    search_fields = ['nome_cartao']
    ordering = ['-criado_em']
