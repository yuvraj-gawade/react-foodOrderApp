import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CardContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
    const [btnisHighlighted, setBtnisHighlighted] = useState(false);
    const ctx = useContext(CardContext);
    const btnClasses = `${classes.button} ${btnisHighlighted ?  classes.bump : ''}`

    const { items } = ctx;
    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnisHighlighted(true);

        const timer = setTimeout(() => {
            setBtnisHighlighted(false);
        }, 300)

        return () => {
            clearTimeout(timer);
        };
    }, [ items ]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {ctx.items.length}
            </span>
        </button>
    );
}

export default HeaderCartButton;