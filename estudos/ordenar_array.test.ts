import { ordenarDecrescente } from './ordenar_array';

describe('Testes da função ordenarDecrescente', () => {
    test('Deve ordenar corretamente as palavras em ordem decrescente (Z → A)', () => {
        const arrayTeste = ['carro', 'boneco', 'ave', 'lapis'];
        const esperado = ['lapis', 'carro', 'boneco', 'ave'];
        expect(ordenarDecrescente(arrayTeste)).toEqual(esperado);
    });
});
