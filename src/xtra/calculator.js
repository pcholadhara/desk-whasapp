export const getTaxableA = (amountWithTax, taxP) =>{
    const a = taxP + 100;
    const b = 100/a;
    const c = b * amountWithTax;
    return c;
}

export const getTaxA = (amount, taxP) =>{
    const taxA = Math.round((taxP * 0.0001) * amount);
    return taxA;
}

export const getDiscA = (amount, discP) =>{
    return (discP * 0.01) * amount;
}

export const getDiscP = (amount, discA) =>{
    return (discA / amount ) * 100;
}