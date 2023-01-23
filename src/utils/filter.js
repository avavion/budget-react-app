import { OPERATION_TYPES } from "../types/operations";

// Фильтр доходов
export const filterIncome = (data) => {
    return data.filter((item) => {
        return item.type === OPERATION_TYPES.INCOME;
    });
}

// Фильтр расходов
export const filterExpense = (data) => {
    return data.filter((item) => {
        return item.type === OPERATION_TYPES.EXPENSE;
    });
}