// Define your products and their ingredients
export const products = [
    {
        name: 'Klasikinė Duona',
        category: 'Duona',
        price: 7,
        maxProductQuantity: 2,
        ingredients: [
            { name: 'мука', multiplier: 358, minQuantity: 1 },
            { name: 'закваска', multiplier: 145, minQuantity: 1 },
            { name: 'вода', multiplier: 220, minQuantity: 1 },
            { name: 'соль', multiplier: 8.5, minQuantity: 1 }
        ]
    },
    {
        name: 'Linų sėklų Duona',
        category: 'Duona',
        price: 8,
        maxProductQuantity: 2,
        ingredients: [
            { name: 'мука', multiplier: 358, minQuantity: 1 },
            { name: 'закваска', multiplier: 145, minQuantity: 1 },
            { name: 'вода', multiplier: 220, minQuantity: 1 },
            { name: 'соль', multiplier: 8.5, minQuantity: 1 },
            { name: 'семена', multiplier: 30, minQuantity: 1 }
        ]
    },
    {
        name: 'Prancūziška Duona',
        category: 'Duona',
        price: 8,
        maxProductQuantity: 2,
        ingredients: [
            { name: 'мука', multiplier: 330, minQuantity: 1 },
            { name: 'закваска', multiplier: 135, minQuantity: 1 },
            { name: 'вода', multiplier: 210, minQuantity: 1 },
            { name: 'сахар', multiplier: 30, minQuantity: 1 },
            { name: 'соль', multiplier: 7, minQuantity: 1 },
            { name: 'масло', multiplier: 20, minQuantity: 1 }
        ]
    },
    {
        name: 'Pomidorinė su čederiu Duona',
        category: 'Duona',
        price: 9,
        maxProductQuantity: 2,
        ingredients: [
            { name: 'мука', multiplier: 358, minQuantity: 1 },
            { name: 'закваска', multiplier: 145, minQuantity: 1 },
            { name: 'вода', multiplier: 120, minQuantity: 1 },
            { name: 'томатный сок', multiplier: 100, minQuantity: 1 },
            { name: 'соль', multiplier: 7, minQuantity: 1 },
            { name: 'чеддер', multiplier: 60, minQuantity: 1 }
        ]
    },
    {
        name: 'Karamelizuotų svogūnų Duona',
        category: 'Duona',
        price: 8,
        maxProductQuantity: 2,
        ingredients: [
            { name: 'мука', multiplier: 358, minQuantity: 1 },
            { name: 'закваска', multiplier: 145, minQuantity: 1 },
            { name: 'вода', multiplier: 120, minQuantity: 1 },
            { name: 'соль', multiplier: 8.5, minQuantity: 1 },
            { name: 'солод', multiplier: 10, minQuantity: 1 },
            { name: 'лук', multiplier: 50, minQuantity: 1 },
            { name: 'сливочное масло', multiplier: 10, minQuantity: 1 }
        ]
    },
    {
        name: 'Pilno grūdo Duona',
        category: 'Duona',
        price: 7,
        maxProductQuantity: 2,
        ingredients: [
            { name: 'мука', multiplier: 617, minQuantity: 2 },
            { name: 'ц3 мука', multiplier: 100, minQuantity: 2 },
            { name: 'закваска', multiplier: 290, minQuantity: 2 },
            { name: 'вода', multiplier: 450, minQuantity: 2 },
            { name: 'соль', multiplier: 17, minQuantity: 2 }
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
                    { name: 'мука', multiplier: 50, minQuantity: 1 },
                    { name: 'вода', multiplier: 120, minQuantity: 1 },
                ]
            },
            {
                name: 'тесто',
                subIngredients: [
                    { name: 'закваска', multiplier: 120, minQuantity: 1 },
                    { name: 'молоко', multiplier: 90, minQuantity: 1 },
                    { name: 'заварка', multiplier: 170, minQuantity: 1 },
                    { name: 'мука', multiplier: 400, minQuantity: 1 },
                    { name: 'яйцо', multiplier: 1, minQuantity: 1 },
                    { name: 'сахар', multiplier: 50, minQuantity: 1 },
                    { name: 'соль', multiplier: 7, minQuantity: 1 },
                    { name: 'сливочное масло', multiplier: 60, minQuantity: 1 },
                ]
            },
            {
                name: 'крем',
                subIngredients: [
                    { name: 'молоко', multiplier: 200, minQuantity: 1 },
                    { name: 'яйцо', multiplier: 3, minQuantity: 1 },
                    { name: 'сахар', multiplier: 70, minQuantity: 1 },
                    { name: 'мука', multiplier: 30, minQuantity: 1 },
                    { name: 'темный шоколад 54,5%', multiplier: 80, minQuantity: 1 },
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
                    { name: 'мука', multiplier: 50, minQuantity: 1 },
                    { name: 'вода', multiplier: 120, minQuantity: 1 },
                ]
            },
            {
                name: 'тесто',
                subIngredients: [
                    { name: 'закваска', multiplier: 120, minQuantity: 1 },
                    { name: 'молоко', multiplier: 90, minQuantity: 1 },
                    { name: 'заварка', multiplier: 170, minQuantity: 1 },
                    { name: 'мука', multiplier: 400, minQuantity: 1 },
                    { name: 'яйцо', multiplier: 1, minQuantity: 1 },
                    { name: 'сахар', multiplier: 50, minQuantity: 1 },
                    { name: 'соль', multiplier: 7, minQuantity: 1 },
                    { name: 'сливочное масло', multiplier: 60, minQuantity: 1 },
                ]
            },
            {
                name: 'маковая начинка',
                subIngredients: [
                    { name: 'молоко', multiplier: 175, minQuantity: 1 },
                    { name: 'манка', multiplier: 25, minQuantity: 1 },
                    { name: 'мак', multiplier: 150, minQuantity: 1 },
                    { name: 'сахар', multiplier: 70, minQuantity: 1 },
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
                    { name: 'мука', multiplier: 50, minQuantity: 1 },
                    { name: 'вода', multiplier: 120, minQuantity: 1 },
                ]
            },
            {
                name: 'тесто',
                subIngredients: [
                    { name: 'закваска', multiplier: 120, minQuantity: 1 },
                    { name: 'молоко', multiplier: 90, minQuantity: 1 },
                    { name: 'заварка', multiplier: 170, minQuantity: 1 },
                    { name: 'мука', multiplier: 400, minQuantity: 1 },
                    { name: 'яйцо', multiplier: 1, minQuantity: 1 },
                    { name: 'сахар', multiplier: 50, minQuantity: 1 },
                    { name: 'соль', multiplier: 7, minQuantity: 1 },
                    { name: 'сливочное масло', multiplier: 60, minQuantity: 1 },
                ]
            },
        ]
    },
    {
        name: 'Cinnabons su citrininiu kremu',
        category: 'Cinnabons',
        price: 8,
        maxProductQuantity: 4,
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
                    { name: 'кремчиз', multiplier: 200, minQuantity: 1 },
                    { name: 'сахарная пудра', multiplier: 100, minQuantity: 1 },
                    { name: 'лимон', multiplier: 1, minQuantity: 1 },
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
            { name: 'масло', multiplier: 90, minQuantity: 1 },
            { name: 'сахар мусковадо', multiplier: 60, minQuantity: 1 },
            { name: 'сахар', multiplier: 30, minQuantity: 1 },
            { name: 'соль', multiplier: 1, minQuantity: 1 },
            { name: 'яйцо', multiplier: 1, minQuantity: 1 },
            { name: 'мука', multiplier: 135, minQuantity: 1 },
            { name: 'какао', multiplier: 25, minQuantity: 1 },
            { name: 'разрыхлитель', multiplier: 3, minQuantity: 1 },
            { name: 'темный шоколад 54,5%', multiplier: 120, minQuantity: 1 },
            { name: 'начинка', multiplier: 4, minQuantity: 1 },
        ]
    }
    // Other products...
];