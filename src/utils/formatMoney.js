import formatNumber from "./formatNumber";

// Функция форматирования для денег
const formatMoney = (value, format = "руб.") => {
    return `${formatNumber(value)} ${format}`;
}

export default formatMoney;