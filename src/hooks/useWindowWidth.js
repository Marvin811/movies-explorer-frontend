import {useEffect, useState} from "react";

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const handleResize = () => setWindowWidth(window.innerWidth);

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', () => setTimeout(handleResize, 300));
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return windowWidth

};

export default useWindowWidth;
