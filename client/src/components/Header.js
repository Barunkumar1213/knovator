import React from 'react';
import { AppBar, Toolbar, Typography, Button, Badge, IconButton } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Header = () => {
  const { cart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          E-Commerce Store
        </Typography>
        <IconButton
          component={Link}
          to="/cart"
          color="inherit"
          aria-label="shopping cart"
          sx={{ mr: 2 }}
        >
          <Badge badgeContent={itemCount} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <Button color="inherit" component={Link} to="/">
          Products
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;