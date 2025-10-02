import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{ 
          objectFit: 'contain',
          backgroundColor: '#f5f5f5',
          p: 2
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.description}
        </Typography>
        <Typography variant="h6" color="primary">
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          startIcon={<AddShoppingCart />}
          fullWidth
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;