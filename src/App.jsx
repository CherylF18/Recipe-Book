import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { ThemeProvider } from "./components/ThemeContext.jsx";
import Home from "./Home.jsx"
import RecipePage from "./components/RecipePage.jsx";
import { RecipesProvider } from "./components/RecipesContext.jsx";

export default function App() {
    const [recipes, setRecipes] = useState(() => {
        const savedRecipes = localStorage.getItem("recipes");
        return savedRecipes ? JSON.parse(savedRecipes) : []; 
    });
    
    useEffect(() => {
        localStorage.setItem("recipes", JSON.stringify(recipes));
    }, [recipes]);

    return (
        <RecipesProvider>
            <ThemeProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/recipe/:id" element={<RecipePage/>} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </RecipesProvider>
    );
}