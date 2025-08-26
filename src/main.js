/**
 * Функция для расчета выручки
 * @param purchase запись о покупке
 * @param _product карточка товара
 * @returns {number}
 */
function calculateSimpleRevenue(purchase, _product) {
    // @TODO: Расчёт прибыли от операции

    const { discount, sale_price, quantity } = purchase;

    return sale_price * quantity * (1 - (discount / 100));

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

    if (index === 0) {
        return profit * 0.15;
    } else if (index === 1 || index === 2) {
        return profit * 0.1;
    } else if (index === total - 1) {
        return profit * 0;
    } else {
        return profit * 0.05;
    } 
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

    if (!typeof options === "object") {
        throw new Error('options не является объектом');
    } 

    if (!typeof calculateRevenue === "function" || !typeof calculateBonus === "function") {
        throw new Error('Один из параметров options не является функцией');
    } 

    // const products_sold = new Map([products.sku, value]);

    // @TODO: Подготовка промежуточных данных для сбора статистики

    const sellerStats = data.sellers.map(seller => ({
        id: seller.id,
        name: `${seller.first_name} ${seller.last_name}`,
        revenue: 0,
        profit: 0,
        sales_count: 0,
        products_sold: {}
    })); 

    // @TODO: Индексация продавцов и товаров для быстрого доступа

    const productIndex = Object.fromEntries(data.products.map(product => [product.sku, product]));

    const sellerIndex = Object.fromEntries(sellerStats.map(seller => [seller.id, seller]));

    // @TODO: Расчет выручки и прибыли для каждого продавца

    data.purchase_records.forEach(record => { // Чек 
        const seller = sellerIndex[record.seller_id]; // Продавец
        // Увеличить количество продаж
        // Увеличить общую сумму всех продаж
        seller.sales_count += 1;
        seller.revenue += record.total_amount;

        // Расчёт прибыли для каждого товара
        record.items.forEach(item => {
            const product = productIndex[item.sku]; // Товар
            
            // Посчитать себестоимость (cost) товара как product.purchase_price, умноженную на количество товаров из чека
            const cost = product.purchase_price * item.quantity

            // Посчитать выручку (revenue) с учётом скидки через функцию calculateRevenue
            const revenue = calculateRevenue(item, product);

            // Посчитать прибыль: выручка минус себестоимость
            const profit = revenue - cost;
            
            // Увеличить общую накопленную прибыль (profit) у продавца  
            seller.profit += profit;

            // Учёт количества проданных товаров
            if (!seller.products_sold[item.sku]) {
                seller.products_sold[item.sku] = 0;
            }

            // По артикулу товара увеличить его проданное количество у продавца
            seller.products_sold[item.sku] += item.quantity;
        });
    });

    console.log(data.sellerStats);

    // @TODO: Сортировка продавцов по прибыли
    sellerStats.sort((a, b) => {
        return b.profit - a.profit
    }); 

    // @TODO: Назначение премий на основе ранжирования
    sellerStats.forEach((seller, index) => {
        seller.bonus = calculateBonus(index, sellerStats.length, seller);
        seller.top_products = Object.entries(seller.products_sold)
        .map(([key, value]) => ({
            sku: key,
            quantity: value
        }))
        .sort((a, b) => {
            return b.quantity - a.quantity
        })
        .slice(0, 10);
    }); 

    // @TODO: Подготовка итоговой коллекции с нужными полями
    return sellerStats.map(seller => ({
        seller_id: seller.id, // Строка, идентификатор продавца
        name: seller.name, // Строка, имя продавца
        revenue: +seller.revenue.toFixed(2),  // Число с двумя знаками после точки, выручка продавца
        profit: +seller.profit.toFixed(2), // Число с двумя знаками после точки, прибыль продавца
        sales_count: seller.sales_count, // Целое число, количество продаж продавца
        top_products: seller.top_products, // Массив объектов вида: { "sku": "SKU_008","quantity": 10}, топ-10 товаров продавца
        bonus: +seller.bonus.toFixed(2)  // Число с двумя знаками после точки, бонус продавца
    })); 

}

// В функциях с более чем десятью строками эти шаги есть почти всегда:
// 1. Проверить переданные данные.
// 2. Проверить нужные для работы настройки/опции/зависимости.
// 3. Собрать промежуточные данные.
// 4. Выполнить основные действия.
// 5. Сформировать итоговый ответ.
