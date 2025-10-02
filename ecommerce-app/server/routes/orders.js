const express = require('express');
const router = express.Router();
const { saveOrder, getAllOrders } = require('../utils/orderStorage');

// Place a new order
router.post('/', (req, res) => {
  const { firstName, lastName, address, items } = req.body;
  
  // Validate required fields
  if (!firstName || !lastName || !address || !items || items.length === 0) {
    return res.status(400).json({ 
      message: 'First name, last name, address, and at least one item are required' 
    });
  }

  try {
    const order = {
      id: Date.now(),
      firstName,
      lastName,
      address,
      items,
      total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      date: new Date().toISOString(),
      status: 'completed'
    };

    // Save the order to file
    const saved = saveOrder(order);
    if (!saved) {
      throw new Error('Failed to save order');
    }
    
    res.status(201).json({ 
      message: 'Order placed successfully',
      order: order
    });
  } catch (error) {
    console.error('Order processing error:', error);
    res.status(500).json({ 
      message: 'Failed to process order',
      error: error.message 
    });
  }
});

// Get all orders (for admin purposes)
router.get('/', (req, res) => {
  try {
    const orders = getAllOrders();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

module.exports = router;