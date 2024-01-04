// Function to calculate all ingredients
export function calculateTotalIngredients(products) {
    // Ignore list for ingredients that should be denoted as 'vnt.' instead of 'g.'
    const ignoreList = ['яйцо', 'начинка', 'лимон'];

    products.forEach(product => {
        const quantityInput = document.getElementById(`${product.name.toLowerCase().replace(' ', '-')}-quantity`);
        const quantity = parseFloat(quantityInput.value) || 0;

        product.ingredients.forEach(ingredient => {
            if (ingredient.subIngredients) {
                ingredient.subIngredients.forEach(subIngredient => {
                    const subMultiplierInput = document.getElementById(`${product.name.toLowerCase().replace(' ', '-')}-${ingredient.name.toLowerCase().replace(' ', '-')}-${subIngredient.name.toLowerCase().replace(' ', '-')}-multiplier`);
                    const subMultiplier = parseFloat(subMultiplierInput.value) || subIngredient.multiplier;
                    const subTotal = quantity * subMultiplier;

                    document.getElementById(`${product.name.toLowerCase().replace(' ', '-')}-${ingredient.name.toLowerCase().replace(' ', '-')}-${subIngredient.name.toLowerCase().replace(' ', '-')}-total`).textContent = ignoreList.includes(subIngredient.name) ? `${Math.round(subTotal)} vnt.` : `${subTotal.toFixed(2)} g.`;
                });
            } else {
                const multiplierInput = document.getElementById(`${product.name.toLowerCase().replace(' ', '-')}-${ingredient.name.toLowerCase().replace(' ', '-')}-multiplier`);
                const multiplier = parseFloat(multiplierInput.value) || ingredient.multiplier;
                const total = quantity * multiplier;

                document.getElementById(`${product.name.toLowerCase().replace(' ', '-')}-${ingredient.name.toLowerCase().replace(' ', '-')}-total`).textContent = ignoreList.includes(ingredient.name) ? `${Math.round(total)} vnt.` : `${total.toFixed(2)} g.`;
            }
        });
    });
}