import React from 'react';

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    remoteItem: (id) => {},
    clearCart: () => {}
});

export default CartContext;