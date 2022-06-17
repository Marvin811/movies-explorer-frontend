import "./Burger.css";
import burgerIcon from "../../images/burgerIcon.svg";
import React from "react";
import Logo from "../Logo/Logo";

function Burger(props) {
    const { openBurger } = props;
    return (
        <section className="burger-header">
            <Logo />
            <img
                src={burgerIcon}
                onClick={openBurger}
                className="burger-header__button link-opacity"
                alt="Иконка выпадающего меню"
            ></img>
        </section>
    );
}

export default Burger;
