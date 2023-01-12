const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

const percentaFormatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2
});

const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "Qua" },
    { value: 1e18, symbol: "Qui" },
    { value: 1e21, symbol: '1' },
    { value: 1e24, symbol: '1S' },
    { value: 1e27, symbol: '1O' },
    { value: 1e30, symbol: '1N' },
    { value: 1e33, symbol: '1D' },
    { value: 1e36, symbol: '1U' },
    { value: 1e39, symbol: '1D' },
    { value: 1e42, symbol: '1!' },
    { value: 1e45, symbol: '1@' },
    { value: 1e48, symbol: '1#' },
    { value: 1e51, symbol: '1$' },
    { value: 1e54, symbol: '1%' },
    { value: 1e57, symbol: '1^' },
    { value: 1e60, symbol: '1&' },
    { value: 1e63, symbol: '1*' },
    { value: 1e66, symbol: '1(' },
    { value: 1e69, symbol: '1)' },
];
const regx = /\.0+$|(\.[0-9]*[1-9])0+$/;

export function kFormatter(num = 0, digits = 1) {

    const item = lookup.slice().reverse().find(function (item) {
        return num >= item.value;
    });

    return item ? (num / item.value).toFixed(digits).replace(regx, "$1") + item.symbol : "0";
}


export function fCurrency(amount: string | number) {
    const number = Number(amount);
    return currencyFormatter.format(number);
}

export function fDecimal(amount: string | number, digits = 2) {

    const number = Number(amount);

    const decimalFormatter = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: digits
    });

    return decimalFormatter.format(number);
}

export function fPercent(number: number) {
    return percentaFormatter.format(number / 100);
}

export function superScript(number: number) {

    const numberString = number.toString();
    const superscript = [ '⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹' ];
    return numberString.split('').map((char) => superscript[ parseInt(char) ]).join('');
}

export function subscript(number: number) {
    const numberString = number.toString();
    const subscript = [ '₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉' ];
    return numberString.split('').map((char) => subscript[ parseInt(char) ]).join('');
}


export function getPrecision(num: number, fractionDigits: number) {

    const str = (num || 0).toFixed(fractionDigits);
    const [ before, after ] = str.split('.');
    const zerosBefore = before.length - 1;
    const firstNonZeroChar = after?.split('').findIndex(char => char !== '0');
    const zerosAfter = firstNonZeroChar === -1 ? 0 : firstNonZeroChar;
    const precision = zerosBefore + zerosAfter;

    return {
        precision,
        zerosBefore,
        zerosAfter,
        decimal: after?.slice(firstNonZeroChar, after.length)
    };
}

export function tokenPriceSS(value: number, fractionDigits: number) {

    if (value >= 0.01)
        return fDecimal(value, fractionDigits);

    const { precision, decimal } = getPrecision(value, fractionDigits);
    const ss = subscript(precision);

    return `0.0${ss}${decimal}`;
}