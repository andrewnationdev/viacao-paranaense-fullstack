export const formatCurrency = (value: string | number | undefined | null): string => {

    if (value === undefined || value === null || value === '') {

        return 'R$ 00,00';

    }

    let val = typeof value === 'number' ? value.toString() : value;

    return `R$ ${val.replaceAll('.', ',')}`;

};