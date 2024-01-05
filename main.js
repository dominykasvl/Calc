import { products } from './modules/productData.js';
import { generateProductHTML, generateProductIngredientsHTML, generateIngredientTableHTML } from './modules/htmlGenerator.js';
import { calculateTotalIngredients } from './modules/ingredientCalculator.js';

// Generate the HTML for all products and add it to the page
let allProductsHTML = '';
let currentCategory = '';
let tableCounter = 0;
// products.forEach(product => {
//     if (product.category !== currentCategory) {
//         currentCategory = product.category;
//         allProductsHTML += `<h2>${currentCategory}</h2>`;
//     }
//     allProductsHTML += generateProductHTML(product, tableCounter);
// });

document.body.innerHTML += allProductsHTML + `<button id="generate-pdf">Generuoti PDF</button><hr />`;


// Creating a button row for each product and appending it to the document body
const buttonRow = document.createElement('div');
buttonRow.classList.add('button-row');

products.forEach(product => {
    const generateButton = document.createElement('button');
    generateButton.textContent = "+ " + product.name;
    generateButton.style.marginRight = '10px'; // Add padding between buttons
    generateButton.style.marginTop = '10px'; // Add padding between buttons and tables
    generateButton.addEventListener('click', () => {
        const productIngredientsHTML = generateProductIngredientsHTML(product, tableCounter);
        // Append the table to the productTablesDiv
        productTablesDiv.insertAdjacentHTML('beforeend', productIngredientsHTML);
        tableCounter++;
        sessionStorage.setItem('tableCounter', tableCounter); // Save tableCounter to sessionStorage
        onTableUpdate();
    });

    buttonRow.appendChild(generateButton);
});

// Append the button row to the document body
document.body.appendChild(buttonRow);
document.body.appendChild(document.createElement('hr'));

// Button to calculate all ingredients
const totalIngredientsButton = document.createElement('button');
totalIngredientsButton.textContent = 'Paskaičiuoti visus ingredientus';
totalIngredientsButton.addEventListener('click', () => {
    const productTables = document.querySelectorAll('#product-tables table');
    if (productTables.length === 0) {
        alert('Pridėkite bent vieną produktą!');
        return;
    }

    const ingredientTotals = {};
    productTables.forEach(table => {
        const rows = table.querySelectorAll('tr');
        // Skip the first row (header)
        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].querySelectorAll('td');
            const ingredientNameHTML = cells[0].innerHTML;
            // Skip if ingredient is enclosed in <strong>
            if (ingredientNameHTML.includes('<strong>')) {
                continue;
            }
            const ingredientName = cells[0].textContent.trim();
            const quantity = Number(cells[1].querySelector('input').value);
            if (ingredientTotals[ingredientName]) {
                ingredientTotals[ingredientName] += quantity;
            } else {
                ingredientTotals[ingredientName] = quantity;
            }
        }
    });

    const allIngredientsDiv = document.getElementById('all-ingredients');
    let ingredientTableHTML = '<h3>Visų ingredientų lentelė</h3><table><caption style="display: none;">Visų ingredientų lentelė</caption><tr><th>Ingredientai</th><th>Iš viso kiekis vnt. / g.</th></tr>';
    for (const [ingredient, total] of Object.entries(ingredientTotals)) {
        ingredientTableHTML += `<tr><td>${ingredient}</td><td id="${ingredient}-total">${total}</td></tr>`;
    }
    ingredientTableHTML += '</table>';

    if (allIngredientsDiv) {
        allIngredientsDiv.innerHTML = ingredientTableHTML;
    } else {
        const newDiv = document.createElement('div');
        newDiv.id = 'all-ingredients';
        newDiv.innerHTML = ingredientTableHTML;
        document.body.appendChild(newDiv);
    }

    onTableUpdate();
});
document.body.appendChild(totalIngredientsButton);

//Create button to delete all tables in the page and clear sessionStorage
const deleteAllTablesButton = document.createElement('button');
deleteAllTablesButton.textContent = 'Ištrinti visas lenteles';
deleteAllTablesButton.style.marginLeft = '110px';
deleteAllTablesButton.style.color = 'red';
deleteAllTablesButton.addEventListener('click', () => {
    const confirmDelete = confirm('Ar norite ištrinti visas lenteles?');
    if (confirmDelete) {
        const productTablesDiv = document.getElementById('product-tables');
        productTablesDiv.innerHTML = '';

        const allIngredientsDiv = document.getElementById('all-ingredients');
        allIngredientsDiv.innerHTML = '';

        sessionStorage.clear();
    }
});
document.body.appendChild(deleteAllTablesButton);

const allIngredientsDiv = document.createElement('div');
allIngredientsDiv.id = 'all-ingredients';

const productTablesDiv = document.createElement('div');
productTablesDiv.id = 'product-tables';

document.body.appendChild(allIngredientsDiv);
document.body.appendChild(productTablesDiv);

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

    // Add current date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' + dd;
    doc.text(today, 5, 7);

    // Add total price
    const pageWidth = doc.internal.pageSize.getWidth();
    const text = "*Čia suma bus*";
    const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const textX = pageWidth - textWidth - 5; // Adjust the position as needed
    doc.text(text, textX, 7);

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
                        // Get the color from the style attribute of the parent tr element
                        let color = data.cell.raw.parentElement.style.color;
                        // If a color is set, use it for the cell text color in the PDF
                        if (color) {
                            data.cell.styles.textColor = color;
                        }
                    }
                },
                didDrawCell: function (data) {
                    // If it's the first cell of the body section and the caption has not been drawn yet
                    if (data.cell.section === 'body' && data.row.index === 0 && data.column.index === 0 && !captionDrawn) {
                        // Draw the caption just above the cell
                        doc.setFontSize(14);
                        doc.text(caption, data.cell.x, data.cell.y - 5);
                        captionDrawn = true;
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

// Load saved table states when the page is loaded
window.onload = function () {
    var allIngredientsDiv = document.getElementById('all-ingredients');
    var productTablesDiv = document.getElementById('product-tables');

    var savedAllIngredientsTable = sessionStorage.getItem('allIngredientsTable');
    var savedProductTables = sessionStorage.getItem('productTables');

    if (savedAllIngredientsTable) {
        allIngredientsDiv.innerHTML = savedAllIngredientsTable;
    }

    if (savedProductTables) {
        productTablesDiv.innerHTML = savedProductTables;
    }

    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        var savedInput = sessionStorage.getItem(inputs[i].id);
        if (savedInput) {
            inputs[i].value = savedInput;
        }
    }

    // Load tableCounter from sessionStorage
    tableCounter = sessionStorage.getItem('tableCounter');
    if (tableCounter === null) {
        tableCounter = 0;
    } else {
        tableCounter = Number(tableCounter); // Convert to number
    }
}

// Save table states when any table is updated
// Assuming you have a function that is called whenever a table is updated
function onTableUpdate() {
    var allIngredientsDiv = document.getElementById('all-ingredients');
    var productTablesDiv = document.getElementById('product-tables');

    sessionStorage.setItem('allIngredientsTable', allIngredientsDiv.innerHTML);
    sessionStorage.setItem('productTables', productTablesDiv.innerHTML);
}

// Save input states when any input value changes
window.oninput = function (e) {
    var input = e.target;
    sessionStorage.setItem(input.id, input.value);
}