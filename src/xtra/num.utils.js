export const toDecimal2 = (integer) =>{
    return Number(integer/100).toFixed(2)
}

export const toInt2 = (string) =>{
    let value = parseFloat(string) || 0;
    if (isNaN(value)) {
        return 0;
    }
    return Math.round(value * 100);
}