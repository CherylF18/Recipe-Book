import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { ThemeProvider } from "./components/ThemeContext.jsx";
import Home from "./Home.jsx"
import RecipePage from "./components/RecipePage.jsx";

export default function App() {
    const [recipes, setRecipes] = useState(() => {
        const savedRecipes = localStorage.getItem("recipes");
        return savedRecipes ? JSON.parse(savedRecipes) : []; 
    });
    
    useEffect(() => {
        localStorage.setItem("recipes", JSON.stringify(recipes));
    }, [recipes]);

    return (
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home recipes={recipes} setRecipes={setRecipes}/>} />
                    <Route path="/recipe/:id" element={<RecipePage recipes={recipes} setRecipes={setRecipes}/>} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}