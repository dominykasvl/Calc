export function createPdfButton() {
    // Generate PDF button click event handler
    const generatePdfButton = document.getElementById('generate-pdf');
    generatePdfButton.classList.add('btn', 'btn-primary');
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

        // Get the date from the HTML element with id "pdf-time"
        var dateElement = document.getElementById('pdf-time');
        var today;

        if (dateElement && dateElement.value) {
            // If the element exists and its value is not empty, use its value
            today = dateElement.value;
        } else {
            // Otherwise, use the current date
            var date = new Date();
            var dd = String(date.getDate()).padStart(2, '0');
            var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = date.getFullYear();
            today = yyyy + '-' + mm + '-' + dd;
        }

        doc.text(today, 5, 7);

        // Calculate sum total of product prices
        const priceElements = document.querySelectorAll('input.price');
        let totalPrice = 0;
        priceElements.forEach(priceElement => {
            const price = parseFloat(priceElement.value);
            if (!isNaN(price)) {
                totalPrice += price;
            }
        });

        // Add total price
        const pageWidth = doc.internal.pageSize.getWidth();
        const text = "Iš viso: " + totalPrice.toFixed(2) + "€"; // Display the total price with 2 decimal places
        const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const textX = pageWidth - textWidth - 5; // Adjust the position as needed
        doc.text(text, textX, 7);

        const reportTables = Array.from(document.querySelectorAll('table')).filter(table => table.id !== 'summary-table');
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
}