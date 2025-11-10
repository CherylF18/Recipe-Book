import "./RecipeList.css"
import RecipeCard from "./RecipeCard.jsx"

export default function RecipeList({ recipes }) {
    if (recipes.length === 0) {
        return (<p>No recipes yet!</p>);
    }

    return ( 
        <div className="container">
            {recipes.map((recipe) => (<RecipeCard key={recipe.id} recipe={recipe}/>))}
        </div>
    );
}