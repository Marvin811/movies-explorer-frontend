import React, {useState} from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import './App.css';
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {Header} from "../Header/Header";
import {Main} from "../Main/Main";
import {Footer} from "../Footer/Footer";
import {Login} from "../Login/Login";
import {Register} from "../Register/Register";
import {Movies} from "../Movies/Movies";
import {SavedMovies} from   "../SavedMovies/SavedMovies";
import {Profile} from "../Profile/Profile";
import {NotFoundPage} from "../NotFoundPage/NotFoundPage";



function App() {
    const [currentUser, setCurrentUser] = useState({});
    const location = useLocation();
    const pathPageWithHeader = ['/']
    const pathPageWithFooter = ['/', '/movies', '/saved-movies']
    return (
        <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
            {pathPageWithHeader.includes(location.pathname) && <Header/>}
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/signin" element={< Login/>}/>
                <Route path="/signup" element={<Register/>}/>
                <Route path="/movies" element={<Movies/>}/>
                <Route path="/saved-movies" element={<SavedMovies/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/*" element={< NotFoundPage/>}/>
            </Routes>


            {pathPageWithFooter.includes(location.pathname) && <Footer/>}
        </div>
        </CurrentUserContext.Provider>
    )
        ;
}

export default App;
