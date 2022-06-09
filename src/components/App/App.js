import React from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import './App.css';
import {Header} from "../Header/Header";
import {Main} from "../Main/Main";
import {Footer} from "../Footer/Footer";
import {Login} from "../Login/Login";
import {Register} from  "../Register/Register";
import {Movies} from "../Movies/Movies"
import {NotFoundPage} from "../NotFoundPage/NotFoundPage"

function App() {
    const location = useLocation();
    const pathPageWithHeader = ['/']
    const pathPageWithFooter = ['/', '/movies', '/saved-movies']
    return (
        <div className="page">
            {pathPageWithHeader.includes(location.pathname) && <Header/> }
            <Routes>
                <Route path="/" element={<Main />}/>
                <Route path="/movies" element={<Movies />}/>
                <Route path="/signin" element={< Login />}/>
                <Route path="/signup" element={<Register />}/>


                <Route path="/*" element={< NotFoundPage />} />
            </Routes>


            {pathPageWithFooter.includes(location.pathname) && <Footer/>}
        </div>


    )
        ;
}

export default App;
