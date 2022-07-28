import React from "react";
import './SearchForm.css';
import find from '../../../images/find.svg';
import Checkbox from "../../FilterCheckbox/FilterCheckbox";

export function SearchForm({
                               isLoading,
                               handleSearchButton,
                               handleSearchQuery,
                               searchQuery,
                               switchShortMovie,
                               isActiveCheckbox
                           }) {

    return (
        <section className="search">
            <div className="search__container">
                <form className="search__form" onSubmit={handleSearchButton}>
                    <div className="search__input-container">
                        <input
                            className="search__input"
                            type="text"
                            name="searchValue"
                            placeholder="Фильм"
                            required
                            value={searchQuery}
                            onChange={handleSearchQuery}
                        />
                        <button className="search__button" type="submit" disabled={isLoading || !searchQuery}>
                            <img src={find} alt="Кнопка поиска"/>
                        </button>
                    </div>
                </form>
                <div className="search__short-films">
                    <p className="search__short-films_title">Короткометражки</p>
                    <Checkbox switchShortMovie={switchShortMovie} isActive={isActiveCheckbox}/>
                </div>
            </div>
        </section>
    )
}
