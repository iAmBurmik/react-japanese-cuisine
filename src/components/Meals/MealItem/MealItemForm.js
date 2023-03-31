import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";
import React, {useRef, useState} from "react";

const MealItemForm = (props) => {
    const [inputIsValid, setInputIsValid] = useState(true)
    const inputRef = useRef();
    const submitHandler = event => {
        event.preventDefault();
        
        const inputAmount = inputRef.current.value;
        if(inputAmount.trim().length === 0 || +inputAmount < 1) {
            setInputIsValid(false);
            return;
        }
        setInputIsValid(true);
        props.addToChart(+inputAmount);
    }

    return (
        <form onSubmit={submitHandler} className={styles.form}>
            <Input ref={inputRef} label="Количество" input={{
                id: props.id,
                type: 'number',
                min: '1',
                step: '1',
                defaultValue: '1'
            }}/>
            <button>Добавить</button>
            {!inputIsValid && <p>Введите количество больше 0</p>}
        </form>
    )
}
export default MealItemForm;