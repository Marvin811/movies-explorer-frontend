import React from "react";
import './Header.css';
import {Link} from "react-router-dom";
import Navigation from '../Navigation/Navigation'
import Logo from '../Logo/Logo';

export function Header(props) {
    const {loggedIn} = props;
    return (
        <header className='header'>{loggedIn ? (<Navigation type='header'/>) : (
            <nav className="header__container">
                <> <Logo/>
                    <div className="header__links">
                        <Link className="header__link" to="/signup">
                            <h2 className="header__link-title">Регистрация</h2>
                        </Link>
                        <Link className="header__link" to="/signin">
                            <button className="header__link-button">Войти</button>
                        </Link>

                    </div>
                </>

            </nav>
        )
        }
        </header>
    )
}
