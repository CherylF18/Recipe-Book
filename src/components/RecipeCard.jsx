export default function Recipe({ recipe }) {
    return (
        <div className="content" onClick={() => {window.open(`/recipe/${recipe.id}`, "_blank")}}>
            <h2>{recipe.recipeName}</h2>
            <p>{recipe.category}</p>
        </div>
    );
}