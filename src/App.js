import React, { useState, useEffect } from 'react';
import './App.css';
import Recipe from './Recipe';

function App() {

  const APP_ID = '4767b429';
  const APP_KEY = 'f2a1a0856ea66ddd0525fd7b405d3ded';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect( () => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  return (
    <div className="App">
      <form className="search-form">
        <input className="search-bar" value={search} type="text" onChange={updateSearch}/>
        <button className="search-button" type="submit">Search</button>
      </form>
      {recipes.map(recipe =>(
        <Recipe
        key = {recipe.recipe.label} 
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories} 
        image={recipe.recipe.image}/>
      ))}
    </div>
  );
}

export default App;
