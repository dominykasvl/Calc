// Function to calculate all ingredients
export function calculateTotalIngredients(products, tableCounter) {
    // Ignore list for ingredients that should be denoted as 'vnt.' instead of 'g.'
    const ignoreList = ['яйцо', 'начинка', 'лимон'];

    products.forEach(product => {console.log("Table counter: " + tableCounter);
        const quantityInput = document.getElementById(`${product.name.toLowerCase().replace(' ', '-')}-quantity`); console.log(`${product.name.toLowerCase().replace(' ', '-')}-quantity-${tableCounter}`);
        const quantity = parseFloat(quantityInput.value) || 0;

        product.ingredients.forEach(ingredient => {
            if (ingredient.subIngredients) {
                ingredient.subIngredients.forEach(subIngredient => {
                    const subMultiplierInput = document.getElementById(`${product.name.toLowerCase().replace(' ', '-')}-${ingredient.name.toLowerCase().replace(' ', '-')}-${subIngredient.name.toLowerCase().replace(' ', '-')}-multiplier-${tableCounter}`);
                    const subMultiplier = parseFloat(subMultiplierInput.value) || subIngredient.multiplier;
                    const subTotal = quantity * subMultiplier;

                    document.getElementById(`${product.name.toLowerCase().replace(' ', '-')}-${ingredient.name.toLowerCase().replace(' ', '-')}-total-${tableCounter}`).textContent = ignoreList.includes(ingredient.name) ? `${Math.round(total)} vnt.` : `${total.toFixed(2)} g.`;
                });
            } else {
                const multiplierInput = document.getElementById(`${product.name.toLowerCase().replace(' ', '-')}-${ingredient.name.toLowerCase().replace(' ', '-')}-multiplier-${tableCounter}`); console.log(`${product.name.toLowerCase().replace(' ', '-')}-${ingredient.name.toLowerCase().replace(' ', '-')}-multiplier-${tableCounter}`);
                const multiplier = parseFloat(multiplierInput.value) || ingredient.multiplier;
                const total = quantity * multiplier;

                document.getElementById(`${product.name.toLowerCase().replace(' ', '-')}-${ingredient.name.toLowerCase().replace(' ', '-')}-total-${tableCounter}`).textContent = ignoreList.includes(ingredient.name) ? `${Math.round(total)} vnt.` : `${total.toFixed(2)} g.`;
            }
        });
    });
}