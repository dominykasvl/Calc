// Define your products and their ingredients
export const products = [
    {
        name: 'Klasikinė Duona',
        category: 'Duona',
        price: 7,
        maxProductQuantity: 2,
        ingredients: [
            { name: 'мука', multiplier: 358, minQuantity: 2 },
            { name: 'закваска', multiplier: 145, minQuantity: 2 },
            { name: 'вода', multiplier: 220, minQuantity: 2 },
            { name: 'соль', multiplier: 8.5, minQuantity: 2 }
        ]
    },
    {
        name: 'Linų sėklų Duona',
        category: 'Duona',
        price: 8,
        maxProductQuantity: 2,
        ingredients: [
            { name: 'мука', multiplier: 358, minQuantity: 2 },
            { name: 'закваска', multiplier: 145, minQuantity: 2 },
            { name: 'вода', multiplier: 220, minQuantity: 2 },
            { name: 'соль', multiplier: 8.5, minQuantity: 2 },
            { name: 'семена', multiplier: 30, minQuantity: 2 }
        ]
    },
    {
        name: 'Prancūziška Duona',
        category: 'Duona',
        price: 8,
        maxProductQuantity: 2,
        ingredients: [
            { name: 'мука', multiplier: 330, minQuantity: 2 },
            { name: 'закваска', multiplier: 135, minQuantity: 2 },
            { name: 'вода', multiplier: 210, minQuantity: 2 },
            { name: 'сахар', multiplier: 30, minQuantity: 2 },
            { name: 'соль', multiplier: 7, minQuantity: 2 },
            { name: 'масло', multiplier: 20, minQuantity: 2 }
        ]
    },
    {
        name: 'Pomidorinė su čederiu Duona',
        category: 'Duona',
        price: 9,
        maxProductQuantity: 2,
        ingredients: [
            { name: 'мука', multiplier: 358, minQuantity: 2 },
            { name: 'закваска', multiplier: 145, minQuantity: 2 },
            { name: 'вода', multiplier: 120, minQuantity: 2 },
            { name: 'томатный сок', multiplier: 100, minQuantity: 2 },
            { name: 'соль', multiplier: 7, minQuantity: 2 },
            { name: 'чеддер', multiplier: 60, minQuantity: 2 }
        ]
    },
    {
        name: 'Karamelizuotų svogūnų Duona',
        category: 'Duona',
        price: 8,
        maxProductQuantity: 2,
        ingredients: [
            { name: 'мука', multiplier: 358, minQuantity: 2 },
            { name: 'закваска', multiplier: 145, minQuantity: 2 },
            { name: 'вода', multiplier: 120, minQuantity: 2 },
            { name: 'соль', multiplier: 8.5, minQuantity: 2 },
            { name: 'солод', multiplier: 10, minQuantity: 2 },
            { name: 'лук', multiplier: 50, minQuantity: 2 },
            { name: 'сливочное масло', multiplier: 10, minQuantity: 2 }
        ]
    },
    {
        name: 'Babka su šokoladiniu kremu',
        category: 'Babka',
        price: 16,
        maxProductQuantity: 2,
        ingredients: [
            {
                name: 'заварка',
                subIngredients: [
                    { name: 'мука', multiplier: 50, minQuantity: 2 },
                    { name: 'вода', multiplier: 120, minQuantity: 2 },
                ]
            },
            {
                name: 'тесто',
                subIngredients: [
                    { name: 'закваска', multiplier: 120, minQuantity: 2 },
                    { name: 'молоко', multiplier: 90, minQuantity: 2 },
                    { name: 'заварка', multiplier: 170, minQuantity: 2 },
                    { name: 'мука', multiplier: 400, minQuantity: 2 },
                    { name: 'яйцо', multiplier: 1, minQuantity: 2 },
                    { name: 'сахар', multiplier: 50, minQuantity: 2 },
                    { name: 'соль', multiplier: 7, minQuantity: 2 },
                    { name: 'сливочное масло', multiplier: 60, minQuantity: 2 },
                ]
            },
            {
                name: 'крем',
                subIngredients: [
                    { name: 'молоко', multiplier: 200, minQuantity: 2 },
                    { name: 'яйцо', multiplier: 3, minQuantity: 2 },
                    { name: 'сахар', multiplier: 70, minQuantity: 2 },
                    { name: 'мука', multiplier: 30, minQuantity: 2 },
                    { name: 'темный шоколад 54,5%', multiplier: 80, minQuantity: 2 },
                ]
            },
        ]
    },
    {
        name: 'Babka su aguonomis',
        category: 'Babka',
        price: 14,
        maxProductQuantity: 2,
        ingredients: [
            {
                name: 'заварка',
                subIngredients: [
                    { name: 'мука', multiplier: 50, minQuantity: 2 },
                    { name: 'вода', multiplier: 120, minQuantity: 2 },
                ]
            },
            {
                name: 'тесто',
                subIngredients: [
                    { name: 'закваска', multiplier: 120, minQuantity: 2 },
                    { name: 'молоко', multiplier: 90, minQuantity: 2 },
                    { name: 'заварка', multiplier: 170, minQuantity: 2 },
                    { name: 'мука', multiplier: 400, minQuantity: 2 },
                    { name: 'яйцо', multiplier: 1, minQuantity: 2 },
                    { name: 'сахар', multiplier: 50, minQuantity: 2 },
                    { name: 'соль', multiplier: 7, minQuantity: 2 },
                    { name: 'сливочное масло', multiplier: 60, minQuantity: 2 },
                ]
            },
            {
                name: 'маковая начинка',
                subIngredients: [
                    { name: 'молоко', multiplier: 175, minQuantity: 2 },
                    { name: 'манка', multiplier: 25, minQuantity: 2 },
                    { name: 'мак', multiplier: 150, minQuantity: 2 },
                    { name: 'сахар', multiplier: 70, minQuantity: 2 },
                ]
            },
        ]
    },
    {
        name: 'Pan Brioche',
        category: 'Brioche',
        price: 8,
        maxProductQuantity: 2,
        ingredients: [
            {
                name: 'заварка',
                subIngredients: [
                    { name: 'мука', multiplier: 50, minQuantity: 2 },
                    { name: 'вода', multiplier: 120, minQuantity: 2 },
                ]
            },
            {
                name: 'тесто',
                subIngredients: [
                    { name: 'закваска', multiplier: 120, minQuantity: 2 },
                    { name: 'молоко', multiplier: 90, minQuantity: 2 },
                    { name: 'заварка', multiplier: 170, minQuantity: 2 },
                    { name: 'мука', multiplier: 400, minQuantity: 2 },
                    { name: 'яйцо', multiplier: 1, minQuantity: 2 },
                    { name: 'сахар', multiplier: 50, minQuantity: 2 },
                    { name: 'соль', multiplier: 7, minQuantity: 2 },
                    { name: 'сливочное масло', multiplier: 60, minQuantity: 2 },
                ]
            },
        ]
    },
    {
        name: 'Cinnabons su citrininiu kremu',
        category: 'Cinnabons',
        price: 8,
        maxProductQuantity: 2,
        ingredients: [
            {
                name: 'тесто',
                subIngredients: [
                    { name: 'мука', multiplier: 250, minQuantity: 2 },
                    { name: 'яйцо', multiplier: 1, minQuantity: 2 },
                    { name: 'дрожжи', multiplier: 2, minQuantity: 2 },
                    { name: 'вода', multiplier: 110, minQuantity: 2 },
                    { name: 'сахар', multiplier: 30, minQuantity: 2 },
                    { name: 'масло', multiplier: 20, minQuantity: 2 },
                    { name: 'соль', multiplier: 2, minQuantity: 2 },
                ]
            },
            {
                name: 'крем',
                subIngredients: [
                    { name: 'кремчиз', multiplier: 200, minQuantity: 2 },
                    { name: 'сахарная пудра', multiplier: 100, minQuantity: 2 },
                    { name: 'лимон', multiplier: 1, minQuantity: 2 },
                ]
            },
            {
                name: 'масло корицы',
                subIngredients: [
                    { name: 'масло', multiplier: 100, minQuantity: 2 },
                    { name: 'корица', multiplier: 20, minQuantity: 2 },
                    { name: 'крахмал', multiplier: 15, minQuantity: 2 },
                    { name: 'сахар', multiplier: 80, minQuantity: 2 },
                ]
            },
        ]
    },
    {
        name: 'Sausainiai',
        category: 'Sausainiai',
        price: 7,
        ingredients: [
            { name: 'масло', multiplier: 90 },
            { name: 'сахар мусковадо', multiplier: 60 },
            { name: 'сахар', multiplier: 30 },
            { name: 'соль', multiplier: 1 },
            { name: 'яйцо', multiplier: 1 },
            { name: 'мука', multiplier: 135 },
            { name: 'какао', multiplier: 25 },
            { name: 'разрыхлитель', multiplier: 3 },
            { name: 'темный шоколад 54,5%', multiplier: 120 },
            { name: 'начинка', multiplier: 4 },
        ]
    }
    // Other products...
];