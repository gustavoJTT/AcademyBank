export const ordenarDecrescente = (arr: string[]): string[] => {
    return arr.sort((a, b) => b.localeCompare(a));
};
