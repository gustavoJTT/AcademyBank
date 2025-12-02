from django.core.management.base import BaseCommand
from api.models import CartaoVirtual

class Command(BaseCommand):
    help = 'Popula o banco de dados com cartões virtuais de exemplo'

    def handle(self, *args, **options):
        # Limpa os dados existentes
        CartaoVirtual.objects.all().delete()

        # Cria cartões de exemplo
        cartoes = [
            CartaoVirtual(
                nome_cartao='Cartão Principal',
                limite=5000.00,
                ativo=True
            ),
            CartaoVirtual(
                nome_cartao='Cartão Compras',
                limite=3000.00,
                ativo=False
            ),
            CartaoVirtual(
                nome_cartao='Cartão Premium',
                limite=10000.00,
                ativo=True
            ),
        ]

        CartaoVirtual.objects.bulk_create(cartoes)

        self.stdout.write(
            self.style.SUCCESS(f'Successfully created {len(cartoes)} cartões virtuais')
        )
