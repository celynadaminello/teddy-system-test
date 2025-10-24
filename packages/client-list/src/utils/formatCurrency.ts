const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

export function formatCurrency(value: number | null | undefined): string {
    if (typeof value !== 'number') {
        return 'N/A';
    }

    return formatter.format(value);
}