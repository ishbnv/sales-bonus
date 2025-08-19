/**
 * Функция для расчета выручки
 * @param purchase запись о покупке
 * @param _product карточка товара
 * @returns {number}
 */
function calculateSimpleRevenue(purchase, _product) {
    // @TODO: Расчёт прибыли от операции

    // Формула простая: доходы (выручка) минус расходы (себестоимость товаров). Чтобы посчитать выручку, нужно определить, сколько точно получено с продажи с учётом скидки и других факторов.
    // Это можно сделать так:
    // 1. Перевести скидку из процентов в десятичное число: скидка / 100.
    // 2. Посчитать полную стоимость, умножив цену продажи на количество.
    // 3. Умножить полную стоимость на 1 - десятичная скидка, чтобы получить остаток суммы без скидки.

    const { discount, sale_price, quantity } = purchase;
}

/**
 * Функция для расчета бонусов
 * @param index порядковый номер в отсортированном массиве
 * @param total общее число продавцов
 * @param seller карточка продавца
 * @returns {number}
 */
function calculateBonusByProfit(index, total, seller) {
    // @TODO: Расчёт бонуса от позиции в рейтинге

    // 15% — для продавца, который принёс наибольшую прибыль.
    // 10% — для продавцов, которые по прибыли находятся на втором и третьем месте.
    // 5% — для всех остальных продавцов, кроме самого последнего.
    // 0% — для продавца на последнем месте.

    const { profit } = seller;
}

/**
 * Функция для анализа данных продаж
 * @param data
 * @param options
 * @returns {{revenue, top_products, bonus, name, sales_count, profit, seller_id}[]}
 */
function analyzeSalesData(data, options) {
    // @TODO: Проверка входных данных

    if (!data
        || !Array.isArray(data.sellers)
        || !Array.isArray(data.products)
        || !Array.isArray(data.purchase_records)
        || data.sellers.length === 0
        || data.products.length === 0
        || data.purchase_records.length === 0
    ) {
        throw new Error('Некорректные входные данные')
    }

    // @TODO: Проверка наличия опций

    const { calculateRevenue, calculateBonus } = options;

    if (typeof options === "object") {
        throw new Error('options не является объектом');
    } 

    if (typeof calculateRevenue === "function" || typeof calculateBonus === "function") {
        throw new Error('Один из параметров options не является функцией');
    } 

    // @TODO: Подготовка промежуточных данных для сбора статистики

    const sellerStats = data.sellers.map(seller => ({
    // Заполним начальными данными
    })); 

    // @TODO: Индексация продавцов и товаров для быстрого доступа

    // @TODO: Расчет выручки и прибыли для каждого продавца

    // @TODO: Сортировка продавцов по прибыли

    // @TODO: Назначение премий на основе ранжирования

    // @TODO: Подготовка итоговой коллекции с нужными полями

    // Здесь проверим входящие данные

    // Здесь посчитаем промежуточные данные и отсортируем продавцов

    // {
    //         id: seller.id,
    //         name: `${seller.first_name} ${seller.last_name}`,
    //         revenue: 0,
    //         profit: 0,
    //         sales_count: 0,
    //     products_sold: {}
    // } 

    const products_sold = new Map([products.sku, value]);

    // Вызовем функцию расчёта бонуса для каждого продавца в отсортированном массиве

    // Сформируем и вернём отчёт
}

// В функциях с более чем десятью строками эти шаги есть почти всегда:
// 1. Проверить переданные данные.
// 2. Проверить нужные для работы настройки/опции/зависимости.
// 3. Собрать промежуточные данные.
// 4. Выполнить основные действия.
// 5. Сформировать итоговый ответ.
