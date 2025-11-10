import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [darkMode, setDark] = useState(() => {
        const isDark = localStorage.getItem("isDark");        
        return isDark ? JSON.parse(isDark) : false;
    });

    useEffect(() => {
        localStorage.setItem("isDark", JSON.stringify(darkMode));
        console.log(JSON.parse(localStorage.getItem("isDark")));
    }, [darkMode]);

    return (
        <ThemeContext.Provider value={{ darkMode, setDark }}>{children}</ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}