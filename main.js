import { products } from './modules/productData.js';
import { generateProductHTML, generateProductIngredientsHTML } from './modules/htmlGenerator.js';
import { calculateTotalIngredients } from './modules/ingredientCalculator.js';

// Generate the HTML for all products and add it to the page
let allProductsHTML = '';
let allProductsIngredientsHTML = '';
let currentCategory = '';
products.forEach(product => {
    if (product.category !== currentCategory) {
        currentCategory = product.category;
        allProductsHTML += `<h2>${currentCategory}</h2>`;
        allProductsIngredientsHTML += `<h2>${currentCategory}</h2>`;
    }
    allProductsHTML += generateProductHTML(product);
    allProductsIngredientsHTML += generateProductIngredientsHTML(product);
});
document.body.innerHTML += allProductsHTML + `<br /><br /><br /><button id="generate-pdf">Generate PDF</button><br /><br /><hr /><br />` + allProductsIngredientsHTML;


// Add event listeners to calculate all ingredients when input values change
products.forEach(product => {
    const quantityInput = document.getElementById(`${product.name.toLowerCase().replace(' ', '-')}-quantity`);
    quantityInput.addEventListener('input', () => calculateTotalIngredients(products));

    product.ingredients.forEach(ingredient => {
        if (ingredient.subIngredients) {
            ingredient.subIngredients.forEach(subIngredient => {
                const subMultiplierInput = document.getElementById(`${product.name.toLowerCase().replace(' ', '-')}-${ingredient.name.toLowerCase().replace(' ', '-')}-${subIngredient.name.toLowerCase().replace(' ', '-')}-multiplier`);
                if (subMultiplierInput) {
                    subMultiplierInput.addEventListener('input', () => calculateTotalIngredients(products));
                }
            });
        } else {
            const multiplierInput = document.getElementById(`${product.name.toLowerCase().replace(' ', '-')}-${ingredient.name.toLowerCase().replace(' ', '-')}-multiplier`);
            if (multiplierInput) {
                multiplierInput.addEventListener('input', () => calculateTotalIngredients(products));
            }
        }
    });
});
// Generate PDF button click event handler
const generatePdfButton = document.getElementById('generate-pdf');
generatePdfButton.addEventListener('click', async function () {
    const doc = new window.jspdf.jsPDF();

    const response = await fetch('/Calc/myfont.ttf');
    const blob = await response.blob();
    const myFont = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsBinaryString(blob);
    });

    // add the font to jsPDF
    doc.addFileToVFS("myfont.ttf", myFont);
    doc.addFont("myfont.ttf", "myfont", "normal");
    doc.setFont("myfont");

    const reportTables = document.querySelectorAll('table');
    let startY = 10; // Initial Y position
    reportTables.forEach(function (table, index) {
        const captionElement = table.querySelector('caption');
        if (captionElement) {
            const caption = captionElement.textContent;

            // Clone the table to not modify the original one
            const clonedTable = table.cloneNode(true);

            // Replace input elements with their values
            const inputs = clonedTable.querySelectorAll('input');
            inputs.forEach(input => {
                const value = input.value;
                input.parentNode.textContent = value;
            });

            let captionDrawn = false;

            // Add the caption as a title to the autoTable
            doc.autoTable({
                html: clonedTable,
                startY: startY + 10,
                styles: { font: "myfont" },
                pageBreak: 'avoid',
                didParseCell: function (data) {
                    // Check if the cell is in the body section
                    if (data.cell.section === 'body') {
                        // Get the color of the text in the original HTML cell
                        let color = $(data.cell.raw).css('color');
                        // Set the cell text color in the PDF
                        data.cell.styles.textColor = color;
                    }
                    // Check if the cell is in the body section
                    if (data.cell.section === 'body') {
                        // Get the color from the style attribute of the parent tr element
                        let color = data.cell.raw.parentElement.style.color;
                        // If a color is set, use it for the cell text color in the PDF
                        if (color) {
                            data.cell.styles.textColor = color;
                        }
                    }
                },
                didDrawPage: function (data) {
                    // Update startY to the Y position where the last table ended + some margin
                    startY = doc.autoTable.previous.finalY + 20;
                }
            });

            // Update startY to the Y position where the last table ended + some margin
            startY = doc.autoTable.previous.finalY + 20;
        }
    });
    doc.save('report.pdf');
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/Calc/service-worker.js').then(function (registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// Load saved input states when the page is loaded
window.onload = function () {
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        var savedInput = sessionStorage.getItem(inputs[i].id);
        if (savedInput) {
            inputs[i].value = savedInput;
        }
    }
    calculateTotalIngredients(products);
}

// Save input states when any input value changes
window.oninput = function (e) {
    var input = e.target;
    sessionStorage.setItem(input.id, input.value);
}