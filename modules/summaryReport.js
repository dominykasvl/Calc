export function createSumarryReportButton() {
    // Generate PDF button click event handler
    const generatePdfButton = document.getElementById('generate-summary');
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

        const table = document.getElementById('summary-table');

        if (table === null) {
            alert('Nėra produktų!');
            return;
        }

        const dates = JSON.parse(table.dataset.dates);
        const minDate = new Date(Math.min.apply(null, dates));
        const maxDate = new Date(Math.max.apply(null, dates));
        const dateRange = `${minDate.toISOString().split('T')[0]} – ${maxDate.toISOString().split('T')[0]}`;


        doc.text(dateRange, 5, 7);

        let startY = 10; // Initial Y position
        const captionElement = table.querySelector('caption');
        if (captionElement) {
            const caption = captionElement.textContent;

            let captionDrawn = false;

            // Add the caption as a title to the autoTable
            doc.autoTable({
                html: table,
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
        doc.save('summary.pdf');
    });
}