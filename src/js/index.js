import Search from "./modules/search.module";
import * as searchView from "./views/search.view";
import * as recipeView from "./views/recipe.view";
import {
  elements,
  renderLoader,
  renderResults,
  clearLoader,
  clearResults,
} from "./views/base";
import { queryArray } from "./modules/search-query";
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
      //render to UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (error) {
      alert("Something wrong with the search...");
    }
  }
};
elements.searchForm.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent reload
  controlSearch();
});

elements.searchResPages.addEventListener("click", (event) => {
  const btn = event.target.closest(".btn-inline");

  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    console.log(state.search);

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

// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);

["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);
