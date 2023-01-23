// Форматирование чисел
const formatNumber = (value) => {
    return Intl.NumberFormat('ru-RU').format(parseInt(value));
}

export default formatNumber;