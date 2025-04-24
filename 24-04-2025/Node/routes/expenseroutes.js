const express = require('express');
const router = express.Router();
const { expenseSchema } = require('../models/usermodels.js');
const { generatePDFReport } = require('../services/pdfReport.js');
const { v4: uuidv4 } = require('uuid');
let expenses = [];

router.post('/', (req, res, next) => {
    const { error } = expenseSchema.validate(req.body);
    if (error) return next(error);

    const expense = { id: uuidv4(), ...req.body };
    expenses.push(expense);
    res.status(201).json(expense);
});

router.get('/', (req, res) => {
    const { month } = req.query;
    if (!month) return res.json(expenses);

    const filtered = expenses.filter(exp => exp.date.startsWith(month));
    res.json(filtered);
});

router.patch('/:id', (req, res) => {
    const idx = expenses.findIndex(e => e.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: "Expense not found" });

    expenses[idx] = { ...expenses[idx], ...req.body };
    res.json(expenses[idx]);
});

router.delete('/:id', (req, res) => {
    const idx = expenses.findIndex(e => e.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: "Expense not found" });

    const deleted = expenses.splice(idx, 1)[0];
    res.json(deleted);
});

router.get('/report.pdf', (req, res) => {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
    generatePDFReport(expenses, res);
});

module.exports = router;
