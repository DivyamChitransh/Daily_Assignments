const PDFDocument = require('pdfkit');

function generatePDFReport(expenses, res) {
    const doc = new PDFDocument();
    doc.pipe(res);

    doc.fontSize(18).text('Expense Report', { align: 'center' });
    doc.moveDown();

    // Table Headers
    doc.fontSize(12).text('Title | Amount | Date');
    doc.moveDown(0.5);

    // Table Data
    expenses.forEach(exp => {
        doc.text(`${exp.title} | $${exp.amount} | ${exp.date}`);
    });

    doc.moveDown(2);
    const monthlyTotals = {};

    expenses.forEach(exp => {
        const month = exp.date.slice(0, 7);
        monthlyTotals[month] = (monthlyTotals[month] || 0) + exp.amount;
    });

    doc.fontSize(14).text('Monthly Totals', { underline: true });
    for (const [month, total] of Object.entries(monthlyTotals)) {
        doc.text(`${month}: $${total.toFixed(2)}`);
    }

    doc.end();
}

module.exports = { generatePDFReport };
