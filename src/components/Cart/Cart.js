import React, { useContext, useState } from "react";
import classes from "./Cart.module.css"
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const context = useContext(CartContext);

    const cartItemRemoveHandler = id => {
        context.remoteItem(id);
    }

    const cartItemAddHandler = item => {
        context.addItem({...item, amount: 1});
    }

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://reacthttp-92850-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: context.items
            })
        });

        setIsSubmitting(false);
        setDidSubmit(true);
        context.clearCart();
    };

    const modalActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        { context.items.length > 0 && <button className={classes.button} onClick={orderHandler}>Order</button> }
    </div>;

    const cartItems = <ul className={classes['cart-items']}>
        {context.items.map(item =>
            <CartItem key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}
            />
        )}
    </ul>;

    const cartModalContent = (<React.Fragment>
        {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>${context.totalAmount}</span>
            </div>
            { isCheckout && <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler}/> }
            { !isCheckout && modalActions }
    </React.Fragment>);

    const isSubmittingModalCotent = <p>Sending order data!</p>;

    const didSubmitModalContent = <React.Fragment>
            <p>Order placed successfully!!!</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onClose}>Close</button>
            </div>
        </React.Fragment>;
    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalCotent}
            { !isSubmitting && didSubmit && didSubmitModalContent }
        </Modal>
    );
}

export default Cart;