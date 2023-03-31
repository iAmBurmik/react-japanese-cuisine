import Modal from "../UI/Modal";
import styles from "./Cart.module.css"
import CartContext from "../../store/cart-context";
import React, {useContext, useState} from "react";
import CartItem from "./CartItem";
import SubmitOrder from "./submitOrder";

const Cart = (props) => {
    const ctx = useContext(CartContext);
    const [isReadyToOrder, setIsReadyToOrder] = useState(false);
    const [isDataSubmitting, setIsDataSubmitting] = useState(false);
    const [wasDataSendingSuccesful, setWasDataSendingSuccesful] = useState(false);

    const addItemHandler = (item) => {
        ctx.addItem({...item, amount: 1})
    }

    const removeItemHandler = (id, price) => {
        ctx.removeItem(id, price);
    }

    const CartItems = (
        <ul className={styles['cart-items']}>
            {ctx.items.map(item => <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onAdd={addItemHandler.bind(null, item)} onRemove={removeItemHandler.bind(null, item.id, item.price)}/>)}
        </ul>
    );

    const foodOrderHandler = () => {
        setIsReadyToOrder(true);
    }

    const submitOrderHandler = async (userData) => {
        setIsDataSubmitting(true);
        const response = await fetch("https://japan-cuisine-default-rtdb.firebaseio.com/orders.json", {
            method: "POST",
            body: JSON.stringify({
                user: userData,
                meals: ctx.items
            }),
            headers: {"Content-Type": "application/json"},
        })

        setIsDataSubmitting(false);
        if(response.ok) {
            setWasDataSendingSuccesful(true);
        }
        ctx.clear();
    }

    const buttons = (
        <div className={styles.actions}>
            <button onClick={props.onHide} className={styles['button--alt']}>Закрыть</button>
            {ctx.items.length > 0 && <button onClick={foodOrderHandler} className={styles.button}>Заказать</button>}
        </div>
    )

    const cartModalContent = (
        <React.Fragment>
            {CartItems}
            <div className={styles.total}>
                <span>Итого</span>
                <span>{`$${ctx.totalAmount.toFixed(2)}`}</span>
            </div>
            {isReadyToOrder && <SubmitOrder onSubmit={submitOrderHandler} cancel={props.onHide}/>}
            {!isReadyToOrder && buttons}
        </React.Fragment>
    )

    const dataSubmittingCartModalContent = <p>Отправка данных заказа...</p>
    const dataWasSubmittedCartModalContent = (
        <React.Fragment>
            <p>Ваш заказ успешно отправлен!</p>
            <div className={styles.actions}>
                <button onClick={props.onHide} className={styles['button--alt']}>Закрыть</button>
            </div>
        </React.Fragment>);

    return (
        <Modal onHide={props.onHide}>
            {!isDataSubmitting && !wasDataSendingSuccesful && cartModalContent}
            {isDataSubmitting && dataSubmittingCartModalContent}
            {wasDataSendingSuccesful && dataWasSubmittedCartModalContent}
        </Modal>
    )
}

export default Cart;