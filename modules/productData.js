// Define your products and their ingredients
export const products = [
    {
        name: 'Klasikinė Duona',
        category: 'Duona',
        price: 7,
        ingredients: [
            { name: 'мука', multiplier: 358 },
            { name: 'закваска', multiplier: 145 },
            { name: 'вода', multiplier: 220 },
            { name: 'соль', multiplier: 8.5 }
        ]
    },
    {
        name: 'Linų sėklų Duona',
        category: 'Duona',
        price: 8,
        ingredients: [
            { name: 'мука', multiplier: 358 },
            { name: 'закваска', multiplier: 145 },
            { name: 'вода', multiplier: 220 },
            { name: 'соль', multiplier: 8.5 },
            { name: 'семена', multiplier: 30 }
        ]
    },
    {
        name: 'Prancūziška Duona',
        category: 'Duona',
        price: 8,
        ingredients: [
            { name: 'мука', multiplier: 330 },
            { name: 'закваска', multiplier: 135 },
            { name: 'вода', multiplier: 210 },
            { name: 'сахар', multiplier: 30 },
            { name: 'соль', multiplier: 7 },
            { name: 'масло', multiplier: 20 }
        ]
    },
    {
        name: 'Pomidorinė su čederiu Duona',
        category: 'Duona',
        price: 9,
        ingredients: [
            { name: 'мука', multiplier: 358 },
            { name: 'закваска', multiplier: 145 },
            { name: 'вода', multiplier: 120 },
            { name: 'томатный сок', multiplier: 100 },
            { name: 'соль', multiplier: 7 },
            { name: 'чеддер', multiplier: 60 }
        ]
    },
    {
        name: 'Karamelizuotų svogūnų Duona',
        category: 'Duona',
        price: 8,
        ingredients: [
            { name: 'мука', multiplier: 358 },
            { name: 'закваска', multiplier: 145 },
            { name: 'вода', multiplier: 120 },
            { name: 'соль', multiplier: 8.5 },
            { name: 'солод', multiplier: 10 },
            { name: 'лук', multiplier: 50 },
            { name: 'сливочное масло', multiplier: 10 }
        ]
    },
    {
        name: 'Babka su šokoladiniu kremu',
        category: 'Babka',
        price: 16,
        ingredients: [
            {
                name: 'заварка',
                subIngredients: [
                    { name: 'мука', multiplier: 50 },
                    { name: 'вода', multiplier: 120 },
                ]
            },
            {
                name: 'тесто',
                subIngredients: [
                    { name: 'закваска', multiplier: 120 },
                    { name: 'молоко', multiplier: 90 },
                    { name: 'заварка', multiplier: 170 },
                    { name: 'мука', multiplier: 400 },
                    { name: 'яйцо', multiplier: 1 },
                    { name: 'сахар', multiplier: 50 },
                    { name: 'соль', multiplier: 7 },
                    { name: 'сливочное масло', multiplier: 60 },
                ]
            },
            {
                name: 'крем',
                subIngredients: [
                    { name: 'молоко', multiplier: 200 },
                    { name: 'яйцо', multiplier: 3 },
                    { name: 'сахар', multiplier: 70 },
                    { name: 'мука', multiplier: 30 },
                    { name: 'темный шоколад 54,5%', multiplier: 80 },
                ]
            },
        ]
    },
    {
        name: 'Babka su aguonomis',
        category: 'Babka',
        price: 14,
        ingredients: [
            {
                name: 'заварка',
                subIngredients: [
                    { name: 'мука', multiplier: 50 },
                    { name: 'вода', multiplier: 120 },
                ]
            },
            {
                name: 'тесто',
                subIngredients: [
                    { name: 'закваска', multiplier: 120 },
                    { name: 'молоко', multiplier: 90 },
                    { name: 'заварка', multiplier: 170 },
                    { name: 'мука', multiplier: 400 },
                    { name: 'яйцо', multiplier: 1 },
                    { name: 'сахар', multiplier: 50 },
                    { name: 'соль', multiplier: 7 },
                    { name: 'сливочное масло', multiplier: 60 },
                ]
            },
            {
                name: 'маковая начинка',
                subIngredients: [
                    { name: 'молоко', multiplier: 175 },
                    { name: 'манка', multiplier: 25 },
                    { name: 'мак', multiplier: 150 },
                    { name: 'сахар', multiplier: 70 },
                ]
            },
        ]
    },
    {
        name: 'Pan Brioche',
        category: 'Brioche',
        price: 8,
        ingredients: [
            {
                name: 'заварка',
                subIngredients: [
                    { name: 'мука', multiplier: 50 },
                    { name: 'вода', multiplier: 120 },
                ]
            },
            {
                name: 'тесто',
                subIngredients: [
                    { name: 'закваска', multiplier: 120 },
                    { name: 'молоко', multiplier: 90 },
                    { name: 'заварка', multiplier: 170 },
                    { name: 'мука', multiplier: 400 },
                    { name: 'яйцо', multiplier: 1 },
                    { name: 'сахар', multiplier: 50 },
                    { name: 'соль', multiplier: 7 },
                    { name: 'сливочное масло', multiplier: 60 },
                ]
            },
        ]
    },
    {
        name: 'Cinnabons su citrininiu kremu',
        category: 'Cinnabons',
        price: 8,
        ingredients: [
            {
                name: 'тесто',
                subIngredients: [
                    { name: 'мука', multiplier: 250 },
                    { name: 'яйцо', multiplier: 1 },
                    { name: 'дрожжи', multiplier: 2 },
                    { name: 'вода', multiplier: 110 },
                    { name: 'сахар', multiplier: 30 },
                    { name: 'масло', multiplier: 20 },
                    { name: 'соль', multiplier: 2 },
                ]
            },
            {
                name: 'крем',
                subIngredients: [
                    { name: 'кремчиз', multiplier: 200 },
                    { name: 'сахарная пудра', multiplier: 100 },
                    { name: 'лимон', multiplier: 1 },
                ]
            },
            {
                name: 'масло корицы',
                subIngredients: [
                    { name: 'масло', multiplier: 100 },
                    { name: 'корица', multiplier: 20 },
                    { name: 'крахмал', multiplier: 15 },
                    { name: 'сахар', multiplier: 80 },
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