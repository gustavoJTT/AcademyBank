from django.db import models

class CartaoVirtual(models.Model):
    nome_cartao = models.CharField(max_length=200, verbose_name='Nome do Cartão')
    limite = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Limite')
    ativo = models.BooleanField(default=True, verbose_name='Ativo')
    criado_em = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    atualizado_em = models.DateTimeField(auto_now=True, verbose_name='Atualizado em')

    class Meta:
        verbose_name = 'Cartão Virtual'
        verbose_name_plural = 'Cartões Virtuais'
        ordering = ['-criado_em']

    def __str__(self):
        return f'{self.nome_cartao} - R$ {self.limite}'
