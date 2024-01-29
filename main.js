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
const allIngredientsButton = document.createElement('button');
allIngredientsButton.textContent = 'Paskaičiuoti visus ingredientus';
allIngredientsButton.classList.add('btn', 'btn-success');

// Assuming allIngredientsButton is a button element
allIngredientsButton.setAttribute('data-bs-toggle', 'popover');
allIngredientsButton.setAttribute('data-bs-placement', 'top');
allIngredientsButton.setAttribute('data-bs-trigger', 'hover');
allIngredientsButton.setAttribute('data-bs-content', 'Pakeitus lenteles, reikia paspausti šį mygtuką, kad atnaujinti visų ingredientų lentelę.');
allIngredientsButton.setAttribute('title', 'Pastaba:');

allIngredientsButton.addEventListener('click', () => {
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
    if (allIngredientsDiv.innerHTML.trim() !== '') {
        // Update existing table
        const oldTable = allIngredientsDiv.querySelector('table');
        const newTable = oldTable.cloneNode(true);
        for (const [ingredient, total] of Object.entries(ingredientTotals)) {
            const ingredientId = ingredient.replace(/\s+/g, '-').replace(/[,%]/g, '');
            let row = newTable.querySelector(`#${ingredientId}-total`);
            if (row) {
                // Update existing row
                row.textContent = total;
            } else {
                // Add new row
                const tr = document.createElement('tr');
                const td1 = document.createElement('td');
                td1.textContent = ingredient;
                const td2 = document.createElement('td');
                td2.id = `${ingredientId}-total`;
                td2.textContent = total;
                tr.appendChild(td1);
                tr.appendChild(td2);

                // Get the tbody element, or create one if it doesn't exist
                let tbody = newTable.querySelector('tbody');
                if (!tbody) {
                    tbody = document.createElement('tbody');
                    newTable.appendChild(tbody);
                }

                // Add the new row to the tbody element
                tbody.appendChild(tr);
            }
        }
        // Force reflow
        newTable.offsetHeight;

        oldTable.parentNode.replaceChild(newTable, oldTable);

    } else {
        // Create new table
        let ingredientTableHTML = '<h3 class="h3">Visų ingredientų lentelė</h3><table class="table table-hover table-bordered"><caption style="display: none;">Visų ingredientų lentelė</caption><tr class="table-dark"><th>Ingredientai</th><th>Iš viso kiekis vnt. / g.</th></tr>';
        for (const [ingredient, total] of Object.entries(ingredientTotals)) {
            const ingredientId = ingredient.replace(/\s+/g, '-').replace(/[,%]/g, '');
            ingredientTableHTML += `<tr><td>${ingredient}</td><td id="${ingredientId}-total">${total}</td></tr>`;
        }
        ingredientTableHTML += '</table>';
        allIngredientsDiv.innerHTML = ingredientTableHTML;
    }

    onTableUpdate();
});

// Button to calculate all ingredients
const totalIngredientsButton = document.createElement('button');
totalIngredientsButton.textContent = 'Paskaičiuoti visus ingredientus';
totalIngredientsButton.classList.add('btn', 'btn-success');

// Assuming totalIngredientsButton is a button element
totalIngredientsButton.setAttribute('data-bs-toggle', 'popover');
totalIngredientsButton.setAttribute('data-bs-placement', 'top');
totalIngredientsButton.setAttribute('data-bs-trigger', 'hover');
totalIngredientsButton.setAttribute('data-bs-content', 'Pakeitus lenteles, reikia paspausti šį mygtuką, kad atnaujinti visų ingredientų lentelę.');
totalIngredientsButton.setAttribute('title', 'Pastaba:');

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

//Create button to delete all product tables in the page and clear sessionStorage
const deleteAllTablesButton = document.createElement('button');
deleteAllTablesButton.textContent = 'Ištrinti visas produktų lenteles';
deleteAllTablesButton.classList.add('btn', 'btn-danger');
deleteAllTablesButton.addEventListener('click', () => {
    const confirmDelete = confirm('Ar norite ištrinti visas produktų lenteles?');
    if (confirmDelete) {
        const productTablesDiv = document.getElementById('product-tables');
        productTablesDiv.innerHTML = '';

        const allIngredientsDiv = document.getElementById('all-ingredients');
        allIngredientsDiv.innerHTML = '';

        sessionStorage.clear();
    }
});
//document.body.appendChild(deleteAllTablesButton);

//Create button to delete all ingredients table in the page and clear from localStorage
const deleteAllIngredientsButton = document.createElement('button');
deleteAllIngredientsButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>`;
deleteAllIngredientsButton.setAttribute('data-bs-toggle', 'popover');
deleteAllIngredientsButton.setAttribute('data-bs-placement', 'top');
deleteAllIngredientsButton.setAttribute('data-bs-trigger', 'hover');
deleteAllIngredientsButton.setAttribute('data-bs-content', 'Bus ištrinta visų ingredientų lentelė.');
deleteAllIngredientsButton.setAttribute('title', 'Pastaba:');
deleteAllIngredientsButton.classList.add('btn', 'btn-secondary');
deleteAllIngredientsButton.addEventListener('click', () => {
    const confirmDelete = confirm('Ar norite ištrinti ingredientų lentelę?');
    if (confirmDelete) {
        const allIngredientsDiv = document.getElementById('all-ingredients');
        allIngredientsDiv.innerHTML = '';

        localStorage.removeItem('allIngredientsTable');
    }
});

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

//innerDiv.appendChild(deleteAllIngredientsButton);
//innerDiv.appendChild(allIngredientsButton);
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
datePicker.setAttribute('data-bs-toggle', 'popover');
datePicker.setAttribute('data-bs-placement', 'top');
datePicker.setAttribute('data-bs-trigger', 'hover');
datePicker.setAttribute('data-bs-content', 'Ši data bus matoma PDF faile.');
datePicker.setAttribute('title', 'Pastaba:');

const datePickerLabel = document.createElement('label');
datePickerLabel.setAttribute('for', 'pdf-time');
datePickerLabel.textContent = 'Data:';
datePickerLabel.classList.add('form-label');

// Get the current date
const today = new Date();
// Format the date in the yyyy-mm-dd format
const formattedDate = today.toISOString().split('T')[0];
// Set the value of the date picker to the current date
datePicker.value = formattedDate;

// Create a Bootstrap grid row and column to hold the date picker
const datePickerRow = document.createElement('div');
datePickerRow.classList.add('row', 'justify-content-center', 'mb-3', 'align-items-center', 'flex-column', 'flex-sm-row');

// Create a Bootstrap grid column for the label
const labelCol = document.createElement('div');
labelCol.classList.add('col-12', 'col-sm-2', 'text-center', 'text-sm-end'); // Add 'text-center' and 'text-sm-end' classes to center the text on small screens and align it to the right on larger screens
labelCol.appendChild(datePickerLabel);

const datePickerCol = document.createElement('div');
datePickerCol.classList.add('col-12', 'col-sm-3');
datePickerCol.appendChild(datePicker);

// Append the date picker to the column, and the column to the row
datePickerRow.appendChild(labelCol);
datePickerRow.appendChild(datePickerCol);

// Append the row to the body
document.body.appendChild(datePickerRow);
document.body.appendChild(allIngredientsDiv);
document.body.appendChild(productTablesDiv);

// Create and add button to generate PDF report from all tables in the page
createPdfButton();

// Initialize all popovers
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
});

// Initialize listeners for price change
document.querySelectorAll('.savedPrice').forEach(input => {
    const handleChange = function () {
        // Create alert
        const alert = document.createElement('div');
        alert.className = 'alert alert-warning position-fixed top-0 end-0 alert-dismissible fade show';
        alert.style.zIndex = 9999; // Ensure the alert is above all other elements
        alert.innerHTML = '<button type="button" class="btn-close" data-bs-dismiss="alert"></button><strong>Kaina pakeista!</strong> Pastaba: naujos kainos galios naujiems pridėtiems produktams.';

        // Append alert to body
        document.body.appendChild(alert);

        // Remove alert after 3 seconds
        setTimeout(() => {
            alert.querySelector('.btn-close').click();
        }, 5000);

        // Remove this event listener so the alert only happens once
        this.removeEventListener('change', handleChange);
    };

    input.addEventListener('change', handleChange);
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