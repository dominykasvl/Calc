// Function to generate HTML for a product
export function generateProductHTML(product) {
    let html = `<h3>${product.name}</h3>
<label for="${product.name.toLowerCase().replace(' ', '-')}-quantity">Kiekis, vnt.:</label>
<input type="number" id="${product.name.toLowerCase().replace(' ', '-')}-quantity" />`;

    return html;

}

// Function to generate HTML for a product's ingredients
export function generateProductIngredientsHTML(product) {
    let html = `<h3>Ingredientai produktui "${product.name}"</h3>
<table>
<caption style="display: none;">Ingredientai produktui "${product.name}"</caption>
<tr>
    <th>Ingredientai</th>
    <th>Kiekis vienam vnt.</th>
    <th>Kiekis iš viso, g.</th>
</tr>`;

    // Ignore list for ingredients that should be denoted as 'vnt.' instead of 'g.'
    const ignoreList = ['яйцо', 'начинка', 'лимон'];

    // Dictionary to store sub-ingredient colors
    const subIngredientColors = {};
    let colorIndex = 0;
    const colors = ['red', 'blue', 'green', 'darkgoldenrod', 'purple', 'orange', 'pink', 'brown', 'gray', 'cyan', 'magenta', 'teal', 'lime', 'indigo']; // Add more colors if needed

    product.ingredients.forEach(ingredient => {
        if (ingredient.subIngredients) {
            html += `<tr>
<td>${ingredient.name}</td>
<td></td>
<td id="${product.name.toLowerCase().replace(' ', '-')}-${ingredient.name.toLowerCase().replace(' ', '-')}-total"></td>
</tr>`;
            ingredient.subIngredients.forEach(subIngredient => {
                const unit = ignoreList.includes(subIngredient.name) ? 'vnt.' : 'g.';

                // Check if sub-ingredient is already in the dictionary
                if (!subIngredientColors[subIngredient.name]) {
                    // If not, add it with a new color
                    subIngredientColors[subIngredient.name] = colors[colorIndex % colors.length];
                    colorIndex++;
                }

                // Use the color from the dictionary
                const color = subIngredientColors[subIngredient.name];

                html += `<tr style="color: ${color};">
<td>--${subIngredient.name}</td>
<td><input type="number" id="${product.name.toLowerCase().replace(' ', '-')}-${ingredient.name.toLowerCase().replace(' ', '-')}-${subIngredient.name.toLowerCase().replace(' ', '-')}-multiplier" value="${subIngredient.multiplier}" /></td>
<td id="${product.name.toLowerCase().replace(' ', '-')}-${ingredient.name.toLowerCase().replace(' ', '-')}-${subIngredient.name.toLowerCase().replace(' ', '-')}-total">0 ${unit}</td>
</tr>`;
            });
        } else {
            const unit = ignoreList.includes(ingredient.name) ? 'vnt.' : 'g.';
            html += `<tr>
<td>${ingredient.name}</td>
<td><input type="number" id="${product.name.toLowerCase().replace(' ', '-')}-${ingredient.name.toLowerCase().replace(' ', '-')}-multiplier" value="${ingredient.multiplier}" /></td>
<td id="${product.name.toLowerCase().replace(' ', '-')}-${ingredient.name.toLowerCase().replace(' ', '-')}-total">0 ${unit}</td>
</tr>`;
        }
    });

    html += `</table>`;

    return html;
}