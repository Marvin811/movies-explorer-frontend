import React from "react";
import './SearchForm.css';
import find from '../../images/find.svg';
import Checkbox from "../FilterCheckbox/FilterCheckbox";

export function SearchForm(props) {
    const {  tumbler, setTumbler } = props;
    return (
        <section className="search">
            <div className="search__container">
                <form className="search__form">
                    <div className="search__input-container">
                        <input
                            className="search__input"
                            type="text"
                            name="searchValue"
                            placeholder="Фильм"
                            required
                        />
                        <button className="search__button" type="submit">
                            <img src={find} alt="Кнопка поиска"/>
                        </button>
                    </div>
                </form>
                <div className="search__short-films">
                    <p className="search__short-films_title">Короткометражки</p>
                    <Checkbox tumbler={tumbler} setTumbler={setTumbler} />
                </div>
            </div>
        </section>
    )
}
