'use-client'

import { useState, useEffect } from "react";


function useMedia() {

    const [isSmall, setIsLargeScreen] = useState(false);

    useEffect(() => {
        setIsLargeScreen(!window.matchMedia("(min-width: 820px)").matches);

        // I write this into a function for better visibility
        const handleResize = (e: any) => {
            setIsLargeScreen(!e.matches);
        };

        const mediaQuery = window.matchMedia("(min-width: 821px)");

        mediaQuery.addEventListener('change', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            mediaQuery.removeEventListener('change', handleResize);
        };
    }, []);

    return {
        isSmall
    }
};

export default useMedia;