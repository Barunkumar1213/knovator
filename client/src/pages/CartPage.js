import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  TextField,
  Paper,
  Box,
  Alert,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Cart from '../components/Cart';
import { useCart } from '../contexts/CartContext';

const CartPage = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.address) {
      setError('Please fill in all required fields');
      return;
    }

    if (cart.length === 0) {
      setError('Your cart is empty');
      return;
    }

    try {
      const orderData = {
        ...formData,
        items: cart.map(({ id, name, price, quantity }) => ({
          id,
          name,
          price,
          quantity,
        })),
      };

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      // Clear the cart after successful order
      clearCart();
      
      // Show success message
      setOrderPlaced(true);
    } catch (err) {
      setError('Failed to place order. Please try again.');
      console.error('Order error:', err);
    }
  };

  if (orderPlaced) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Thank You for Your Order!
          </Typography>
          <Typography variant="body1" paragraph>
            Your order has been placed successfully.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate('/');
            }}
          >
            Continue Shopping
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      
      {cart.length > 0 ? (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Cart />
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Shipping Information
              </Typography>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              <Box component="form" onSubmit={handlePlaceOrder}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Shipping Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  margin="normal"
                  multiline
                  rows={3}
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{ mt: 2 }}
                >
                  Place Order
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Box textAlign="center" sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default CartPage;