import styles from "./submitOrder.module.css";
import { useRef, useState } from "react";

const isInputValid = (value) => value.trim().length > 0;

const SubmitOrder = (props) => {
    const nameRef = useRef();
    const cityRef = useRef();
    const addressRef = useRef();

    const [formValidity, setIsFormValidity] = useState({
        name: true,
        city: true,
        address: true,
    });

    const confirmOrderHandler = (event) => {
        event.preventDefault();
        

        const nameValue = nameRef.current.value;
        const cityValue = cityRef.current.value;
        const addressValue = addressRef.current.value;

        const isNameValid = isInputValid(nameValue);
        const isCityValid = isInputValid(cityValue);
        const isAddressValid = isInputValid(addressValue);

        setIsFormValidity({
            name: isNameValid,
            city: isCityValid,
            address: isAddressValid
        });

        const isFormValid = isNameValid && isCityValid && isAddressValid

        if(!isFormValid) {
            return;
        }


        props.onSubmit({
            name: nameValue,
            city: cityValue,
            address: addressValue,
        });
    }

    return (
    <form className={styles.form}>
        <div className={`${styles.control} ${!formValidity.name ? styles.invalid : ""}`}>
            <input ref={nameRef} placeholder="Имя" type="text" id="name"></input>
            {!formValidity.name && <p>Введите имя</p>}
        </div>
        <div className={`${styles.control} ${!formValidity.city ? styles.invalid : ""}`}>
            <input ref={cityRef} placeholder="Город" type="text" id="city"></input>
            {!formValidity.city && <p>Введите город</p>}
        </div>
        <div className={`${styles.control} ${!formValidity.address ? styles.invalid : ""}`}>
            <input ref={addressRef} placeholder="Адрес" type="text" id="address"></input>
            {!formValidity.address && <p>Введите адрес</p>}
        </div>
        <div className={styles.buttons}>
            <button onClick={props.cancel} className={styles['button--alt']}>Отменить</button>
            <button onClick={confirmOrderHandler} className={styles.button}>Подтвердить заказ</button>
        </div>
    </form>)
}

export default SubmitOrder;