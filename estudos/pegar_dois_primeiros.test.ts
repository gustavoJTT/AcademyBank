import { pegarDoisPrimeiros } from './pegar_dois_primeiros';

describe('Testes da função pegarDoisPrimeiros', () => {
    test('Deve retornar apenas os dois primeiros elementos do array', () => {
        const arrayTeste = [2, 4, 6, 2, 8, 9, 5];
        const esperado = [2, 4];
        expect(pegarDoisPrimeiros(arrayTeste)).toEqual(esperado);
    });
});
