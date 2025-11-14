import { createContext, useContext, useState, useEffect } from "react";

const RecipesContext = createContext();

export function RecipesProvider({ children }) {
    const [recipes, setRecipes] = useState(() => {
        const recipes = localStorage.getItem("recipes");        
        return recipes ? JSON.parse(recipes) : [];
    });

    useEffect(() => {
        localStorage.setItem("recipes", JSON.stringify(recipes));
    }, [recipes]);

    return (
        <RecipesContext.Provider value={{ recipes, setRecipes }}>{children}</RecipesContext.Provider>
    );
}

export function useRecipes() {
    return useContext(RecipesContext);
}