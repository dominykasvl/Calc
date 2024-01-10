// Function to generate HTML for a product
export function generateProductHTML(product) {
    let html = `<h3>${product.name}</h3>
    <label for="${product.name.toLowerCase().replace(' ', '-')}-quantity">Kiekis, vnt.:</label>
    <input type="number" id="${product.name.toLowerCase().replace(' ', '-')}-quantity" />`;
    return html;
}

// Function to generate HTML list of all product prices
export function generateProductPriceList(products) {
    let html = `<h3>Produktų kainos</h3>
                <ul>`;
    products.forEach(product => {
        html += `<li>${product.name}: <input type="number" value="${product.price}" id="${generateId(product.name, "price")}" /> €</li>`;
    });
    html += `</ul>`;
    return html;
}

// Function to generate HTML for a product's ingredients
export function generateProductIngredientsHTML(product, tableCounter) {
    let html = `<h3>Ingredientai produktui "${product.name}"</h3>
                <table>
                <caption style="display: none;">Ingredientai produktui "${product.name}"</caption>
                <tr>
                    <th>Kaina</th>
                    <th><input type="number" value="${product.price}" class="price" id="${generateId(product.name, "price", tableCounter)}" /> €</li></th>
                </tr>
                <tr>
                    <th>Ingredientai</th>
                    <th>Kiekis vienam vnt. / g.</th>
                </tr>`;

    // Dictionary to store sub-ingredient colors
    const subIngredientColors = {};
    const colors = ['red', 'blue', 'green', 'darkgoldenrod', 'purple', 'orange', 'pink', 'brown', 'gray', 'cyan', 'magenta', 'teal', 'lime', 'indigo']; // Add more colors if needed

    product.ingredients.forEach(ingredient => {
        html += generateIngredientHTML(ingredient, product, tableCounter, subIngredientColors, colors);
    });

    html += `</table>`;

    return html;
}

function generateIngredientHTML(ingredient, product, tableCounter, subIngredientColors, colors) {
    let html = '';

    if (ingredient.subIngredients) {
        html += `<tr>
        <td><strong>${ingredient.name}</strong></td>
        <td></td>
        </tr>`;

        ingredient.subIngredients.forEach(subIngredient => {
            html += generateSubIngredientHTML(subIngredient, ingredient, product, tableCounter, subIngredientColors, colors);
        });
    } else {
        html += `<tr>
        <td>${ingredient.name}</td>
        <td><input type="number" id="${generateId(product.name, ingredient.name, tableCounter)}" value="${ingredient.multiplier}" /></td>
        </tr>`;
    }

    return html;
}

function generateSubIngredientHTML(subIngredient, ingredient, product, tableCounter, subIngredientColors, colors) {
    if (!subIngredientColors[subIngredient.name]) {
        subIngredientColors[subIngredient.name] = colors[Object.keys(subIngredientColors).length % colors.length];
    }

    const color = subIngredientColors[subIngredient.name];

    return `<tr style="color: ${color};">
            <td>&nbsp;&nbsp;&nbsp;&nbsp;${subIngredient.name}</td>
            <td><input type="number" id="${generateId(product.name, ingredient.name, subIngredient.name, tableCounter)}" value="${subIngredient.multiplier}" /></td>
            </tr>`;
}

function generateId(...parts) {
    return parts.map(part => {
        if (typeof part === 'string') {
            return part.toLowerCase().replace(' ', '-');
        }
        return part;
    }).join('-');
}

// Function to generate HTML for all used ingredients
export function generateIngredientTableHTML(products) {
    let html = `<h3>Ingredientų lentelė</h3>
                <table>
                <caption style="display: none;">Ingredientų lentelė</caption>
                <tr>
                    <th>Ingredientai</th>
                    <th>Viso kiekis</th>
                </tr>`;

    const ingredientTotals = {};

    products.forEach(product => {
        product.ingredients.forEach(ingredient => {
            if (!ingredient.subIngredients) { // Skip parent ingredient if it has subingredients
                if (!ingredientTotals[ingredient.name]) {
                    ingredientTotals[ingredient.name] = 0;
                }
                ingredientTotals[ingredient.name] = "0";
            } else {
                ingredient.subIngredients.forEach(subIngredient => {
                    if (!ingredientTotals[subIngredient.name]) {
                        ingredientTotals[subIngredient.name] = 0;
                    }
                    ingredientTotals[subIngredient.name] = "0";
                });
            }
        });
    });

    for (const ingredientName in ingredientTotals) {
        html += `<tr>
                    <td>${ingredientName}</td>
                    <td id="${ingredientName.toLowerCase().replace(' ', '-')}-total">${ingredientTotals[ingredientName]}</td>
                </tr>`;
    }

    html += `</table>`;

    return html;
}