import CartIcon from "../Cart/CartIcon"
import styles from "./headerCartButton.module.css"
import React, {useContext, useEffect, useState} from "react";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
    const [isButtonAnimated, setIsButtonAnimated] = useState(false);
    const ctx = useContext(CartContext);
    const cartItemsNumber = ctx.items.reduce((currentValue, item) => {
        return currentValue + item.amount;
    }, 0);

    useEffect(() => {
        if(ctx.items.length === 0) {
            return
        }
        setIsButtonAnimated(true);
        const timer = setTimeout(() => {
            setIsButtonAnimated(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        }
    }, [ctx.items]);

    return (
        <button className={`${styles.button} ${isButtonAnimated ? styles.bump : ""}`} onClick={props.onClick}>
            <span className={styles.icon}>{<CartIcon/>}</span>
            <span>Корзина</span>
            <span className={styles.badge}>{cartItemsNumber}</span>
        </button>
    )
}

export default HeaderCartButton;