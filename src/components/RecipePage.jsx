import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeForm from "./RecipeForm";
import "./RecipePage.css";
import Theme from "./Theme";

export default function RecipePage({ recipes, setRecipes }) {
    const [isEditing, setIsEditing] = useState(false);
    const { id } = useParams();
    const recipe = recipes.find(r => r.id == id);

    if (!recipe) { return <p>Jinkies! No recipe found!</p>; }

    const handleSubmit = (updatedRecipe) => {
        const updatedRecipes = recipes.map(r => r.id == updatedRecipe.id ? {...r, ...updatedRecipe} : r);
        localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
        setRecipes([...updatedRecipes]);
        setIsEditing(false);
    }

    return (
        <div className="recipe-page">
            <div className="top header">
                <h1>Recipe Book: {recipe.recipeName}</h1>
                <div className="buttons">
                    <Theme />
                    <button onClick={() => setIsEditing(!isEditing)} id="editButton">Edit</button>
                    {recipe.link && <button onClick={() => window.open(recipe.link, "_blank")}>Go</button>}
                </div>
            </div>

            
            
            {isEditing && <RecipeForm initialData={recipe} onAdd={handleSubmit} />}

            { (recipe.ingredients || recipe.steps) ? <div className="container">
                {recipe.ingredients && (
                    <div className="content">
                        <h3>Ingredients</h3>
                        <ul>
                            {recipe.ingredients.split("\n").filter(line => line.trim()).map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {recipe.steps && (
                    <div className="content">
                        <h3>Steps</h3>
                        <ol>
                            {recipe.steps.split("\n").filter(line => line.trim()).map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ol>
                    </div>
                )}
            </div> : <p> Click edit to add info!</p>}
        </div>
    )
}