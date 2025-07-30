const User = require('../models/User');
const Expense = require('../models/expenseModel');
const Deposit = require('../models/depositModel');
const mongoose = require('mongoose');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }) 
      .select('username email role balance')
      .sort({ balance: -1 });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};


const getUserActivityChart = async (req, res) => {
  try {
    const users = await User.find({}, 'email totalActivity');
    const labels = users.map(u => u.email);
    const data = users.map(u => u.totalActivity || 0);
    res.status(200).json({ labels, data });
  } catch (err) {
    console.error('Error generating chart data:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
// ✅ Get all expenses (with user email)
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate('userId', 'email');
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching expenses", error: err.message });
  }
};

// ✅ Get total deposits (income)
const getTotalDeposits = async (req, res) => {
  try {
    const result = await Deposit.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);
    const total = result.length > 0 ? result[0].total : 0;
    res.json({ total });
  } catch (err) {
    res.status(500).json({ message: 'Error calculating total deposits', error: err.message });
  }
};

// ✅ Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Optionally prevent deleting yourself
    if (req.user.id === userId) {
      return res.status(400).json({ message: "Admins cannot delete themselves" });
    }

    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
};


const getTopUsers = async (req, res) => {
  try {
    const topUsers = await User.find({})
      .select('username email role balance')
      .sort({ balance: -1 })
      .limit(5);

    res.json(topUsers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching top users', error: err.message });
  }
};






const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("username email balance");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      username: user.username,
      email: user.email,
      balance: user.balance
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user data", error: err.message });
  }
};



module.exports = {
  getAllUsers,
  getAllExpenses,
  getTotalDeposits,
  deleteUser,
  getTopUsers,
  getUserDetails,
  getUserActivityChart
};
