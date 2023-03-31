import styles from "./MealItem.module.css"
import MealItemForm from "./MealItemForm";
import React, {useContext} from "react";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
    const formattedPrice = `$${props.price.toFixed(2)}`;
    const ctx = useContext(CartContext);

    const addToChartHandler = (amount) => {
        ctx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        })
    }

    return <li className={styles.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={styles.description}>{props.description}</div>
            <div className={styles.price}>{formattedPrice}</div>
        </div>
        <div>
            <MealItemForm id={props.id} addToChart={addToChartHandler}></MealItemForm>
        </div>
    </li>
}

export default MealItem;