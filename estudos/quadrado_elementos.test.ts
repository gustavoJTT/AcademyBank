import { quadradoFor, quadradoForEach } from './quadrado_elementos';

describe('Testes das funções de quadrado', () => {
    const testArray = [3, 5, 7, 3, 8, 9, 1];
    const expectedResult = [9, 25, 49, 9, 64, 81, 1];

    test('squareWithFor deve calcular corretamente', () => {
        expect(quadradoFor(testArray)).toEqual(expectedResult);
    });

    test('squareWithForEach deve calcular corretamente', () => {
        expect(quadradoForEach(testArray)).toEqual(expectedResult);
    });
});
