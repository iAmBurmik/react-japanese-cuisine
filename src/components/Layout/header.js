import React from "react";
import sushiImage from "../../assets/sushi.jpg";
import styles from "./header.module.css";
import HeaderCartButton from "./headerCartButton";

const Header = (props) => {
    return (
        <React.Fragment>
            <header className={styles.header}>
                <h1>Япона кухня</h1>
                <HeaderCartButton onClick={props.onShow}></HeaderCartButton>
            </header>
            <div className={styles['main-image']}>
                <img src={sushiImage} alt="Блюда японской кухни"></img>
            </div>
        </React.Fragment>
    )
}

export default Header;