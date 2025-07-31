const Income = require('../models/depositModel');
const Expense = require('../models/expenseModel');
const User = require('../models/User');

const getUserIncomes = async (req, res) => {
    try {
        const incomes = await Income.find({ userId: req.user.id }).sort({ date: -1 });
        res.json(incomes);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching incomes', error: err.message });
    }
};




const getUserExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching expenses', error: err.message });
    }
};



const deleteIncome = async (req, res) => {
    try {
        const income = await Deposit.findById(req.params.id); 
        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }

        const user = await User.findById(income.userId);
        if (user) {
            user.balance -= income.amount;
            await user.save();
        }

        await Deposit.findByIdAndDelete(req.params.id);

        res.json({ message: 'Income deleted and balance updated' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting income', error: err.message });
    }
};


const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        const user = await User.findById(expense.userId);
        if (user) {
            user.balance += expense.amount;
            await user.save();
        }

        await Expense.findByIdAndDelete(req.params.id);

        res.json({ message: 'Expense deleted and balance updated' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting expense', error: err.message });
    }
};


module.exports = { 
    getUserIncomes, 
    getUserExpenses, 
    deleteIncome, 
    deleteExpense 
};