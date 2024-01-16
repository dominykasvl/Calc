// Function to generate HTML for a product
export function generateProductHTML(product) {
    let html = `<h3>${product.name}</h3>
    <label for="${product.name.toLowerCase().replace(' ', '-')}-quantity">Kiekis, vnt.:</label>
    <input type="number" id="${product.name.toLowerCase().replace(' ', '-')}-quantity" />`;
    return html;
}

// Function to generate HTML list of all product prices
export function generateProductPriceList(products) {
    let html = `<div id="productPriceDetails">
                    <ul class="list-group list-group-vertical">`;
    products.forEach(product => {
        html += `<li class="list-group-item">${product.name}: <input class="savedPrice" type="number" value="${product.price}" id="${generateId(product.name, "price")}" /> €</li>`;
    });
    html += `</ul>
              </div>`;
    return html;
}

// Function to generate HTML for a product's ingredients
export function generateProductIngredientsHTML(product, tableCounter, quantity) {
    let html = '';
    const maxQuantity = product.maxProductQuantity || quantity;
    let remainingQuantity = quantity;

    while (remainingQuantity > 0) {
        const currentQuantity = Math.min(maxQuantity, remainingQuantity);
        html += generateTableHTML(product, tableCounter, currentQuantity);
        remainingQuantity -= currentQuantity;
        tableCounter++;
    }

    return html;
}

function generateTableHTML(product, tableCounter, quantity) {
    let html = `<div class="col-12 col-lg-6 bg-light border border-4 rounded"> <!-- Add this line -->
                <h3 class="h3">Ingredientai produktui "${product.name}" (${quantity} vnt.)</h3>
                <div class="table-responsive"> <!-- Add this line -->
                    <table class="table table-hover table-bordered table-sm">
                    <caption style="display: none;">Ingredientai produktui "${product.name}" (${quantity} vnt.)</caption>
                    <tr class="table-dark">
                        <th>Kaina</th>
                        <th><input type="number" value="${getProductPriceFromTable(generateId(product.name, "price"))}" class="price" id="${generateId(product.name, "price", tableCounter)}" /> €</li></th>
                    </tr>
                    <tr class="table-dark">
                        <th>Ingredientai</th>
                        <th>Kiekis vienam vnt. / g.</th>
                    </tr>`;

    // Dictionary to store sub-ingredient colors
    const subIngredientColors = {};
    const colors = ['red', 'blue', 'green', 'darkgoldenrod', 'purple', 'orange', 'pink', 'brown', 'gray', 'cyan', 'magenta', 'teal', 'lime', 'indigo']; // Add more colors if needed

    product.ingredients.forEach(ingredient => {
        html += generateIngredientHTML(ingredient, product, tableCounter, subIngredientColors, colors, quantity);
    });

    html += `</table>
            </div> <!-- Close the table-responsive div -->
            </div> <!-- Close the col div -->`;


    return html;
}

function getProductPriceFromTable(productId) {
    const inputElement = document.getElementById(productId);
    if (inputElement) {
        return inputElement.value;
    }
    return null;
}

function generateIngredientHTML(ingredient, product, tableCounter, subIngredientColors, colors, quantity) {
    let html = '';

    let multiplier = ingredient.multiplier;
    if (ingredient.minQuantity && ingredient.minQuantity >= quantity) {
        multiplier *= ingredient.minQuantity;
    } else {
        multiplier *= quantity;
    }

    if (ingredient.subIngredients) {
        html += `<tr class="table-secondary">
        <td><strong>${ingredient.name}</strong></td>
        <td></td>
        </tr>`;

        ingredient.subIngredients.forEach(subIngredient => {
            html += generateSubIngredientHTML(subIngredient, ingredient, product, tableCounter, subIngredientColors, colors, quantity);
        });
    } else {
        html += `<tr>
        <td>${ingredient.name}</td>
        <td><input type="number" id="${generateId(product.name, ingredient.name, tableCounter)}" value="${multiplier}" /></td>
        </tr>`;
    }

    return html;
}

function generateSubIngredientHTML(subIngredient, ingredient, product, tableCounter, subIngredientColors, colors, quantity) {
    if (!subIngredientColors[subIngredient.name]) {
        subIngredientColors[subIngredient.name] = colors[Object.keys(subIngredientColors).length % colors.length];
    }

    const color = subIngredientColors[subIngredient.name];

    let multiplier = subIngredient.multiplier;
    if (subIngredient.minQuantity && subIngredient.minQuantity >= quantity) {
        multiplier *= subIngredient.minQuantity;
    } else {
        multiplier *= quantity;
    }

    return `<tr style="color: ${color};">
            <td>&nbsp;&nbsp;&nbsp;&nbsp;${subIngredient.name}</td>
            <td><input type="number" id="${generateId(product.name, ingredient.name, subIngredient.name, tableCounter)}" value="${multiplier}" /></td>
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
    let html = `<h3 class="h3">Ingredientų lentelė</h3>
                <table class="table table-hover table-bordered">
                <caption style="display: none;">Ingredientų lentelė</caption>
                <tr class="table-dark">
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