import Search from "./modules/search.module";
import * as searchView from "./views/search.view";
import * as recipeView from "./views/recipe.view";
import { elements, renderLoader, clearLoader } from "./views/base";

import Recipe from "./modules/recipe";
/**
 * Global State of the app
 * - Search object
 * -Current recipe object
 * - Liked recipesS
 */
const state = {};

const controlSearch = async () => {
  //get query from UI
  const query = searchView.getInput();

  if (query) {
    //new search object and add to state
    state.search = new Search(query);
    //prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);
    //search for recipes
    try {
      await state.search.getResult();
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (error) {
      alert("Something wrong with the search...");
      clearLoader();
    }
  }
};
elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent reload
  controlSearch();
});

elements.searchResPages.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

//Recipe Controller
const controlRecipe = async () => {
  const id = window.location.hash.replace("#", "");

  if (id) {
    //prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    //highlight selected search item
    if (state.search) searchView.highlightSelected(id);
    //create new recipe object
    state.recipe = new Recipe(id);
    try {
      //get recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      //calculate serving and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      //render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);
    } catch (error) {
      alert("error proccessing recipe");
    }
  }
};

["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);

//handling
elements.recipe.addEventListener("click", (e) => {
  if (e.target.matches(".btn-decrease, .btn-decrease *")) {
    //decrease button click
    if (state.recipe.servings > 1) {
      state.recipe.updateServings("dec");
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches(".btn-increase, .btn-increase *")) {
    //Increase button is click
    state.recipe.updateServings("inc");
    recipeView.updateServingsIngredients(state.recipe);
  }
  console.log(state.recipe);
});
