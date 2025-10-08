export interface IMCCalculavel {
    calcularIMC(): number;
}

export class Pessoa implements IMCCalculavel {
    constructor(public nome: string, public peso: number, public altura: number) {}

    calcularIMC(): number {
        return this.peso / (this.altura * this.altura);
    }
}

export class Atleta implements IMCCalculavel {
    constructor(public nome: string, public peso: number, public altura: number, public fatorMuscular: number) {}

    calcularIMC(): number {
        return (this.peso / (this.altura * this.altura)) - this.fatorMuscular;
    }
}
