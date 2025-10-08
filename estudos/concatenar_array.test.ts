import { concatenarComEspaco } from './concatenar_array';

describe('Testes da função concatenarComEspaco', () => {
    test('Deve concatenar corretamente o array de strings com espaço', () => {
        const arrayTeste = ['Arrays', 'com', 'TypeScript'];
        const esperado = 'Arrays com TypeScript';
        expect(concatenarComEspaco(arrayTeste)).toBe(esperado);
    });
});
