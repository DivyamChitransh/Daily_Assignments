const express = require('express');
const expensesRoutes = require('./routes/expenseroutes.js');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/expenses', expensesRoutes);

app.use((err, req, res, next) => {
    if (err.isJoi) {
        return res.status(400).json({ error: err.details[0].message });
    }
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
