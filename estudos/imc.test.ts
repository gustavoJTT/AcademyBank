import { Pessoa, Atleta } from './imc';

describe('Testes de cálculo de IMC', () => {
    test('Deve calcular corretamente o IMC de uma pessoa comum', () => {
        const joao = new Pessoa('João', 70, 1.75);
        const imcEsperado = 70 / (1.75 * 1.75);
        expect(joao.calcularIMC()).toBeCloseTo(imcEsperado, 5);

        joao.peso = 80;
        joao.altura = 1.8;
        const novoIMC = 80 / (1.8 * 1.8);
        expect(joao.calcularIMC()).toBeCloseTo(novoIMC, 5);
    });

    test('Deve calcular corretamente o IMC de um atleta com fator muscular', () => {
        const maria = new Atleta('Maria', 65, 1.7, 2);
        const imcEsperado = (65 / (1.7 * 1.7)) - 2;
        expect(maria.calcularIMC()).toBeCloseTo(imcEsperado, 5);

        maria.peso = 70;
        maria.altura = 1.75;
        maria.fatorMuscular = 1.5;
        const novoIMC = (70 / (1.75 * 1.75)) - 1.5;
        expect(maria.calcularIMC()).toBeCloseTo(novoIMC, 5);
    });
});
