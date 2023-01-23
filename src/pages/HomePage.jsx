import { useState } from "react";

import { formatMoney } from "../utils";
import { OPERATION_TYPES } from "../types/operations";

const INCOME_CATEGORIES = {
    salary: "Зарплата",
    transfer: "Перевод",
    cashback: "Кэшбек"
};

const EXPENSE_CATEGORIES = {
    products: "Продукты",
    car: "Автомобиль",
    services: "Коммунальные услуги"
}

const CATEGORIES = { ...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES };

const initialItems = [
    {
        id: 1,
        category: "products",
        value: 3000,
        type: "expense",
        date: new Date()
    },
    {
        id: 2,
        category: "salary",
        value: 50315,
        type: "income",
        date: new Date()
    },
    {
        id: 3,
        category: "car",
        value: 20000,
        type: "expense",
        date: new Date()
    }
];

// Фунция определения типа нашей операции
const getItemType = (category) => {
    if (Object.keys(INCOME_CATEGORIES).includes(category)) {
        return OPERATION_TYPES.INCOME;
    }

    return OPERATION_TYPES.EXPENSE;
}


const HomePage = () => {
    const [items, setItems] = useState(initialItems);

    const [balance, setBalance] = useState(0);
    const [category, setCategory] = useState('none');

    const onChangeCategoryHandle = (e) => setCategory(e.target.value);

    const onChangeBalanceHandle = (event) => {
        setBalance((prevState) => {
            const value = parseInt(event.target.value) || 0;

            if (!isNaN(value)) {
                prevState = value;
            }

            return prevState;
        });
    }

    const onAddItemHandle = () => {
        setItems((prevState) => {
            prevState = [...prevState];

            prevState.push({
                id: Date.now(),
                category: category,
                value: balance,
                type: getItemType(category),
                date: new Date()
            });

            return prevState;
        });

        setBalance(0);
    }

    return (
        <section>
            <div className="container">
                <div className="balance">
                    <h2>{formatMoney(50275)}</h2>
                </div>

                <div className="balance-form">
                    <form onSubmit={e => e.preventDefault()}>
                        <h3>Добавить операцию</h3>

                        <div className="wrapper">
                            <input
                                type="text"
                                name="balance"
                                placeholder="30 000"
                                value={balance}
                                onChange={(e) => onChangeBalanceHandle(e)}
                            />

                            <select onChange={(e) => onChangeCategoryHandle(e)} name="category">
                                <option value="none">Не выбрано</option>

                                {
                                    Object.keys(CATEGORIES).map((category) => {
                                        return (
                                            <option key={category} value={category}>
                                                {CATEGORIES[category]}
                                            </option>
                                        );
                                    })
                                }
                            </select>

                            <button onClick={onAddItemHandle} className="button">Добавить операцию</button>
                        </div>
                    </form>
                </div>

                <div className="operations__wrapper">
                    <h2 className="operation__title">
                        Операции
                    </h2>

                    <div className="filter">
                        <button className="button sm">Все операции</button>
                        <button className="button sm green">Все доходы</button>
                        <button className="button sm red">Все расходы</button>
                    </div>

                    <div className="operations">
                        {
                            items.map((item) => {
                                return (
                                    <div key={item.id} className="operation">
                                        <div className={`circle ${item.type === OPERATION_TYPES.INCOME ? "income" : "expense"}`}>
                                            {
                                                item.type === OPERATION_TYPES.INCOME ?
                                                    <i className="fa-solid fa-money-bill"></i>
                                                    :
                                                    <i className="fa-solid fa-shop"></i>
                                            }
                                        </div>

                                        <p className="category">Категория: {CATEGORIES[item.category]}</p>
                                        <p className="total">{formatMoney(item.value)}</p>
                                        <button className="button button--remove">Удалить</button>
                                    </div>
                                );
                            })
                        }
                    </div>

                    <div className="pagination">
                        <button className="pagination__button">
                            1
                        </button>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default HomePage;