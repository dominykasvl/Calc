import { products } from '/Calc/modules/productData.js';
import { generateProductIngredientsHTML, generateProductPriceList } from '/Calc/modules/htmlGenerator.js';
import { createPdfButton } from '/Calc/modules/pdfReport.js';

// Generate the HTML for all products and add it to the page
let tableCounter = 0;

document.body.innerHTML += `<hr />`;


// Creating a button row for each product and appending it to the document body
const buttonRow = document.createElement('div');
buttonRow.classList.add('container-fluid', 'row', 'g-3');

products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('col-6', 'col-sm-3', 'col-md-3', 'col-lg-2', 'd-flex', 'flex-column', 'align-items-center', 'mb-2');

    const inputButtonContainer = document.createElement('div'); // New container for input and button
    inputButtonContainer.classList.add('w-100', 'p-1', 'd-flex', 'flex-column', 'align-items-stretch', 'border', 'border-2', 'rounded');

    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.min = '1';
    quantityInput.value = '1';
    quantityInput.id = product.name + 'quantity-input';
    quantityInput.classList.add('form-control-sm', 'mb-2', 'text-center', 'w-100', 'p-0'); // Full width, no padding

    const generateButton = document.createElement('button');
    generateButton.textContent = "+ " + product.name;
    generateButton.classList.add('btn', 'btn-outline-dark', 'w-100', 'p-0'); // Full width, no padding

    generateButton.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);

        const result = generateProductIngredientsHTML(product, tableCounter, quantity);
        const productIngredientsHTML = result.html;
        tableCounter = result.tableCounter;

        const categoryDivId = product.category.toLowerCase().replace(/\s/g, '-');
        const categoryDiv = document.getElementById(categoryDivId);
        if (categoryDiv) {
            categoryDiv.querySelector('.collapse').querySelector('.card-body').querySelector('.row').insertAdjacentHTML('beforeend', productIngredientsHTML);
        } else {
            const newCategoryDiv = document.createElement('div');
            newCategoryDiv.id = categoryDivId;
            newCategoryDiv.classList.add('d-grid');
            newCategoryDiv.innerHTML = `
                <button class="btn btn-secondary btn-block" type="button" data-bs-toggle="collapse" data-bs-target="#${categoryDivId}-content" aria-expanded="false" aria-controls="${categoryDivId}-content">
                    ${product.category}
                    <span class="badge bg-primary">&#8595;</span>
                </button>
                <div class="collapse" id="${categoryDivId}-content">
                    <div class="card card-body" style="background-color: #ead8c0;">
                        <div class="row">${productIngredientsHTML}</div>
                    </div>
                </div>`;
            productTablesDiv.appendChild(newCategoryDiv);
        }
        tableCounter++;
        sessionStorage.setItem('tableCounter', tableCounter); // Save tableCounter to sessionStorage
        onTableUpdate();
    });

    inputButtonContainer.appendChild(quantityInput); // Append input to the new container
    inputButtonContainer.appendChild(generateButton); // Append button to the new container
    productDiv.appendChild(inputButtonContainer); // Append the new container to the productDiv
    buttonRow.appendChild(productDiv);
});

// Append the button row to the document body
document.body.appendChild(buttonRow);
document.body.appendChild(document.createElement('hr'));

// Button to calculate all ingredients
const totalIngredientsButton = document.createElement('button');
totalIngredientsButton.textContent = 'Paskaičiuoti visus ingredientus';
totalIngredientsButton.classList.add('btn', 'btn-success');
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
        for (let i = 2; i < rows.length; i++) {
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
    let ingredientTableHTML = '<h3 class="h3">Visų ingredientų lentelė</h3><table class="table table-hover table-bordered"><caption style="display: none;">Visų ingredientų lentelė</caption><tr class="table-dark"><th>Ingredientai</th><th>Iš viso kiekis vnt. / g.</th></tr>';
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
//document.body.appendChild(totalIngredientsButton);

//Create button to delete all tables in the page and clear sessionStorage
const deleteAllTablesButton = document.createElement('button');
deleteAllTablesButton.textContent = 'Ištrinti visas lenteles';
deleteAllTablesButton.classList.add('btn', 'btn-danger');
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
//document.body.appendChild(deleteAllTablesButton);

const outerDiv = document.createElement('div');
outerDiv.classList.add('d-flex', 'justify-content-center');

const innerDiv = document.createElement('div');
innerDiv.classList.add('btn-group');
innerDiv.setAttribute('role', 'group');

const pdfButton = document.createElement('button');
pdfButton.textContent = 'Generuoti PDF';
pdfButton.id = 'generate-pdf';

const editPricesButton = document.createElement('button');
editPricesButton.textContent = 'Redaguoti kainas';
editPricesButton.classList.add('btn', 'btn-warning');
editPricesButton.dataset.bsToggle = 'modal';
editPricesButton.dataset.bsTarget = '#priceModal';

innerDiv.appendChild(totalIngredientsButton);
innerDiv.appendChild(editPricesButton);
innerDiv.appendChild(pdfButton);
innerDiv.appendChild(deleteAllTablesButton);

outerDiv.appendChild(innerDiv);

document.body.appendChild(outerDiv);
document.body.appendChild(document.createElement('hr'));

const productPricesDiv = document.getElementById('product-prices');
productPricesDiv.innerHTML = generateProductPriceList(products);

const allIngredientsDiv = document.createElement('div');
allIngredientsDiv.id = 'all-ingredients';
allIngredientsDiv.classList.add('container');

const productTablesDiv = document.createElement('div');
productTablesDiv.id = 'product-tables';
productTablesDiv.classList.add('container', 'd-grid', 'gap-3', 'mb-3');

// Create a date picker
const datePicker = document.createElement('input');
datePicker.type = 'date';
datePicker.id = 'pdf-time';
datePicker.classList.add('form-control');

// Get the current date
const today = new Date();
// Format the date in the yyyy-mm-dd format
const formattedDate = today.toISOString().split('T')[0];
// Set the value of the date picker to the current date
datePicker.value = formattedDate;

// Create a Bootstrap grid row and column to hold the date picker
const datePickerRow = document.createElement('div');
datePickerRow.classList.add('row', 'justify-content-center', 'mb-3');

const datePickerCol = document.createElement('div');
datePickerCol.classList.add('col-sm-3');

// Append the date picker to the column, and the column to the row
datePickerCol.appendChild(datePicker);
datePickerRow.appendChild(datePickerCol);

// Append the row to the body
document.body.appendChild(datePickerRow);
document.body.appendChild(allIngredientsDiv);
document.body.appendChild(productTablesDiv);

// Create and add button to generate PDF report from all tables in the page
createPdfButton();

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

    var inputsSavedPrice = document.getElementsByClassName('savedPrice');
    for (var i = 0; i < inputsSavedPrice.length; i++) {
        var savedInput = localStorage.getItem(inputsSavedPrice[i].id);
        if (savedInput) {
            inputsSavedPrice[i].value = savedInput;
        }
    }

    // Load tableCounter from sessionStorage
    tableCounter = sessionStorage.getItem('tableCounter');
    if (tableCounter === null) {
        tableCounter = 0;
    } else {
        tableCounter = Number(tableCounter); // Convert to number
    }

    const details = document.getElementById('productPriceDetails');

    // Load the saved state from Local Storage
    const isOpen = localStorage.getItem('productPriceDetails');
    if (isOpen === 'true') {
        details.setAttribute('open', '');
    }

    // Save the state to Local Storage whenever it changes
    details.addEventListener('toggle', function () {
        localStorage.setItem('productPriceDetails', details.open);
    });
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
    if (input.classList.contains('savedPrice')) {
        localStorage.setItem(input.id, input.value);
    } else {
        sessionStorage.setItem(input.id, input.value);
    }
}

window.addEventListener('beforeunload', function (e) {
    // Cancel the event
    e.preventDefault();
    // Chrome requires returnValue to be set
    e.returnValue = '';
});