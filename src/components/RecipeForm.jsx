import { useState } from "react";
import "./RecipeForm.css"

export default function RecipeForm({initialData = {}, onAdd, setShow}) {
    const [formData, setFormData] = useState({
        recipeName: initialData.recipeName || "",
        ingredients: initialData.ingredients || "",
        steps: initialData.steps || "",
        category: initialData.category || "",
        link: initialData.link || ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData.recipeName.trim()) { return; }
        const id = initialData.id ? initialData.id : Date.now();
        onAdd({...formData, id: id});
    };

    return (
        <form draggable onSubmit={handleSubmit}>
            <input className="input" type="text" placeholder="Name" 
                name="recipeName"
                value={formData.recipeName} 
                onChange={(e) => handleChange(e)}
            />

            <textarea className="input" placeholder="Ingredients (one per line)" 
                name="ingredients"
                value={formData.ingredients} 
                onChange={(e) => handleChange(e)}
            />

            <textarea className="input" placeholder="Steps (one per line)" 
                name="steps"
                value={formData.steps} 
                onChange={(e) => handleChange(e)}
            />

            <input className="input" type="text" placeholder="Category" 
                name="category"
                value={formData.category} 
                onChange={(e) => handleChange(e)}
            />

            <textarea className="input" type="text" placeholder="Link" 
                name="link"
                value={formData.link} 
                onChange={(e) => handleChange(e)}
            />

            <div id="formButtons">
                <button type="reset" onClick={() => setShow(false)}>Cancel</button>
                <button type="submit">Save</button>
            </div>
        </form>
    );     
}