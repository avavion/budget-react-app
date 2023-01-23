import { INCOME_CATEGORIES } from "../data/categories";
import { OPERATION_TYPES } from "../types/operations";

// Фунция определения типа нашей операции
const getItemType = (category) => {
    if (Object.keys(INCOME_CATEGORIES).includes(category)) {
        return OPERATION_TYPES.INCOME;
    }

    return OPERATION_TYPES.EXPENSE;
}

export default getItemType;