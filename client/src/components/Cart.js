import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Divider,
  TextField,
  Box,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    const quantity = Math.max(1, parseInt(newQuantity) || 1);
    updateQuantity(productId, quantity);
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Shopping Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <List>
          {cart.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: 80, height: 80, objectFit: 'cover', marginRight: 16 }}
                />
                <ListItemText
                  primary={item.name}
                  secondary={`$${item.price.toFixed(2)}`}
                />
                <TextField
                  type="number"
                  size="small"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  inputProps={{ min: 1 }}
                  sx={{ width: 80, mr: 2 }}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Typography variant="h6">
              Total: ${total.toFixed(2)}
            </Typography>
          </Box>
        </List>
      )}
    </Box>
  );
};

export default Cart;