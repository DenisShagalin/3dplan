"use-client";

import { useState, useEffect } from "react";

function useMedia() {
  const [isSmall, setIsLargeScreen] = useState(false);
  const [isMiddle, setIsMiddleScreen] = useState(false);

  useEffect(() => {
    setIsLargeScreen(!window.matchMedia("(min-width: 820px)").matches);
    setIsMiddleScreen(!window.matchMedia("(min-width: 1300px)").matches);

    // I write this into a function for better visibility
    const handleResize = (e: any) => {
      setIsLargeScreen(!e.matches);
    };

    const handleResizeMiddle = (e: any) => {
        setIsMiddleScreen(!e.matches);
      };

    const mediaQuery = window.matchMedia("(min-width: 821px)");
    const mediaQueryMiddle = window.matchMedia("(min-width: 1300px)");

    mediaQuery.addEventListener("change", handleResize);
    mediaQueryMiddle.addEventListener("change", handleResizeMiddle);

    // Clean up the event listener when the component unmounts
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
      mediaQueryMiddle.removeEventListener("change", handleResizeMiddle);
    };
  }, []);

  return {
    isSmall,
    isMiddle,
  };
}

export default useMedia;
