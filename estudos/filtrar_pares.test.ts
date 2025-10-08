import { filtrarPares } from './filtrar_pares';

describe('Testes da função filtrarPares', () => {
    test('Deve retornar apenas os números pares do array', () => {
        const arrayTeste = [8, 3, 9, 5, 6, 12];
        const esperado = [8, 6, 12];
        expect(filtrarPares(arrayTeste)).toEqual(esperado);
    });
});
