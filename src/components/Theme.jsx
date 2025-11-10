import { useEffect, useState } from 'react';
import darkModeImg from '../dark mode.png';
import { useTheme } from './ThemeContext';

export default function Theme() {
    const { darkMode, setDark } = useTheme();

    const varNames = ["--primary-bg-color", "--primary-highlight", "--primary-shadow", "--primary-body"];
    const colors = ["rgb(209, 199, 245)", "rgb(255, 255, 255)", "rgb(178, 165, 224)", "rgb(255, 255, 255)"];
    const darkColors = ["rgba(138, 124, 190, 1)", "rgba(255, 255, 255, 1)", "rgba(103, 91, 150, 1)", "rgba(61, 53, 88, 1)"];

    useEffect(() => {
        let r = document.querySelector(":root");
        let currColors = (darkMode) ? darkColors : colors;
        varNames.forEach((varName, index) => r.style.setProperty(varName, currColors[index]));
    }, [darkMode]);
  
    return(
        <button onClick={() => setDark(!darkMode)}><img src={darkModeImg} alt='Dark mode icon'></img></button>
    );
}