import { useEffect, useState } from 'react';
import './Home.css';
import './components/RecipeForm.css';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import Theme from './components/Theme';
import { useRecipes } from './components/RecipesContext';

export default function Home() {
  const {recipes, setRecipes} = useRecipes();
  const [categories, setCategories] = useState(() => {
    return recipes ? [...new Set(recipes.map((recipe) => recipe.category).filter(category => category))] : [];
  });

  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState(false);
  const [filterCategory, setFilterCategory] = useState(false);

  const addRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
    setShowForm(false);
    if (!categories.includes(newRecipe.category) && newRecipe.category) {
      setCategories([...categories, newRecipe.category]);
    }
  };

  let filteredRecipes = [];
  filteredRecipes = recipes.filter(recipe => {
    const name = recipe.recipeName.toLowerCase();
    const ingredients = recipe.ingredients.split("\n").map(ingredient => ingredient.toLowerCase());

    const searchArr = [...new Set(searchTerm.split(", "))].map(term => term.toLowerCase());
    const nameMatch = searchArr.every(term => name.includes(term));
    const ingredientMatch = searchArr.every(term => ingredients.includes(term));
    const categoryMatch = !filtered || recipe.category === filterCategory;
    return (nameMatch || ingredientMatch) && categoryMatch;
  });

  const categoryFilter = (categoryName) => {
    setFilterCategory(categoryName);
    setFiltered(true);
  };

  const clearRecipes = () => {
    localStorage.removeItem("recipes"); 
    setRecipes([]); 
    setCategories([]);
  };

  return (
    <div id="home">
      <div className="top">
        <div className="header">
          <h1>Recipe Book :3</h1>
          <div id="tools">
            <input type='search' name="q" placeholder='Search..' title='Separate terms by ", "'
              onChange={(e) => {setSearchTerm(e.target.value.toLowerCase())}}></input>
            <div className="buttons">
              <Theme />
              <button onClick={() => setShowForm(!showForm)} id="addButton">+</button>
            </div>
          </div>
        </div>

        { (categories.length > 0) &&
          <div id="navbar">
            <div id="categories"> 
              <button onClick={() => setFiltered(false)}>All</button>
              {categories.map((category) => <button onClick={() => categoryFilter(category)} key={category}>{category}</button>)}
            </div>
          </div>
        }
      </div>
            
      {showForm && <RecipeForm onAdd={addRecipe} setShow={setShowForm}/>}

      <div id="recipe-list">
        <RecipeList recipes={(searchTerm.trim() || filtered) ? filteredRecipes : recipes}/>
      </div>

      <button id="clearBtn" onClick={clearRecipes}>Clear</button>
    </div>
  );
}
