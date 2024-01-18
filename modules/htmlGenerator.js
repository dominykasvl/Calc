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
    let localTableCounter = 0; // Add this line

    while (remainingQuantity > 0) {
        const currentQuantity = Math.min(maxQuantity, remainingQuantity);
        html += generateTableHTML(product, tableCounter, currentQuantity, localTableCounter); // Modify this line
        remainingQuantity -= currentQuantity;
        tableCounter++;
        localTableCounter++; // Add this line
    }

    return { html, tableCounter };
}

function generateTableHTML(product, tableCounter, quantity, localTableCounter) {
    let productPrice = getProductPriceFromTable(generateId(product.name, "price"));
    let totalProductPrice = productPrice * quantity;

    let html = `<div class="col-12 col-lg-6 bg-light border border-4 rounded" id="table-${tableCounter}">
                <h3 class="h3">Ingredientai produktui "${product.name}" (${quantity} vnt.)</h3>
                <span class="badge bg-danger" style="cursor:pointer;" onclick="window.deleteTable('table-${tableCounter}');">&#10006;</span>
                <div class="table-responsive">
                    <table class="table table-hover table-bordered table-sm">
                    <caption style="display: none;">Ingredientai produktui "${product.name}" (${quantity} vnt.)</caption>
                    <tr class="table-dark">
                        <th>Kaina</th>
                        <th><input type="number" value="${totalProductPrice}" class="price" id="${generateId(product.name, "price", tableCounter)}" /> €</li></th>
                    </tr>
                    <tr class="table-dark">
                        <th>Ingredientai</th>
                        <th>Kiekis vienam vnt. / g.</th>
                    </tr>`;

    // Dictionary to store sub-ingredient colors
    const subIngredientColors = {};
    const colors = ['red', 'blue', 'green', 'darkgoldenrod', 'purple', 'orange', 'pink', 'brown', 'gray', 'cyan', 'magenta', 'teal', 'lime', 'indigo']; // Add more colors if needed

    product.ingredients.forEach(ingredient => {
        html += generateIngredientHTML(ingredient, product, tableCounter, subIngredientColors, colors, quantity, localTableCounter); // Modify this line
    });

    html += `</table>
            </div> <!-- Close the table-responsive div -->
            </div>`;


    return html;
}

window.deleteTable = function(tableId) {
    // Remove the table from the DOM
    const table = document.getElementById(tableId);
    table.parentNode.removeChild(table);

    // Get the stored HTML from sessionStorage
    let storedHTML = sessionStorage.getItem('productTables');

    // Create a temporary div to hold the stored HTML
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = storedHTML;

    // Find the table to remove in the stored HTML
    let tableToRemove = tempDiv.querySelector(`#${tableId}`);

    // Remove the table from the stored HTML
    if (tableToRemove) {
        tableToRemove.parentNode.removeChild(tableToRemove);
    }

    // Store the updated HTML back into sessionStorage
    sessionStorage.setItem('productTables', tempDiv.innerHTML);
}

function getProductPriceFromTable(productId) {
    const inputElement = document.getElementById(productId);
    if (inputElement) {
        return inputElement.value;
    }
    return null;
}

function generateIngredientHTML(ingredient, product, tableCounter, subIngredientColors, colors, quantity, localTableCounter) {
    let html = '';

    let multiplier;
    if (localTableCounter === 0 && ingredient.minQuantity && ingredient.minQuantity >= quantity) { // Modify this line
        multiplier = ingredient.multiplier;
    } else {
        multiplier = (ingredient.multiplier / ingredient.minQuantity) * quantity;
    }

    if (ingredient.subIngredients) {
        html += `<tr class="table-secondary">
        <td><strong>${ingredient.name}</strong></td>
        <td></td>
        </tr>`;

        ingredient.subIngredients.forEach(subIngredient => {
            html += generateSubIngredientHTML(subIngredient, ingredient, product, tableCounter, subIngredientColors, colors, quantity, localTableCounter);
        });
    } else {
        html += `<tr>
        <td>${ingredient.name}</td>
        <td><input type="number" id="${generateId(product.name, ingredient.name, tableCounter)}" value="${multiplier}" /></td>
        </tr>`;
    }

    return html;
}

function generateSubIngredientHTML(subIngredient, ingredient, product, tableCounter, subIngredientColors, colors, quantity, localTableCounter) {
    if (!subIngredientColors[subIngredient.name]) {
        subIngredientColors[subIngredient.name] = colors[Object.keys(subIngredientColors).length % colors.length];
    }

    const color = subIngredientColors[subIngredient.name];

    let multiplier;
    if (localTableCounter === 0 && subIngredient.minQuantity && subIngredient.minQuantity >= quantity) { // Modify this line
        multiplier = subIngredient.multiplier;
    } else {
        multiplier = (subIngredient.multiplier / subIngredient.minQuantity) * quantity;
    }

    return `<tr>
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