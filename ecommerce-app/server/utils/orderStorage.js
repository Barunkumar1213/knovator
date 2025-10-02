const fs = require('fs');
const path = require('path');

const ORDERS_FILE = path.join(__dirname, '../data/orders.json');

// Ensure orders file exists with proper content
if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, '[]', 'utf8');
}

const saveOrder = (order) => {
  try {
    const data = fs.readFileSync(ORDERS_FILE, 'utf8');
    const orders = JSON.parse(data || '[]');
    orders.push(order);
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving order:', error);
    return false;
  }
};

const getAllOrders = () => {
  try {
    const data = fs.readFileSync(ORDERS_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.error('Error reading orders:', error);
    return [];
  }
};

module.exports = {
  saveOrder,
  getAllOrders
};