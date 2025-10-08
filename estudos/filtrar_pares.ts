export const filtrarPares = (arr: number[]): number[] => {
    return arr.filter(num => num % 2 === 0);
};
