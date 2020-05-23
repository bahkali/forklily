import Search from "./modules/search.module";
import * as searchView from "./views/search.view";
import { elements } from "./views/base";
import { queryArray } from "./modules/search-query";
/**
 * Global State of the app
 * - Search object
 * -Current recipe object
 * - Liked recipes
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

    //search for recipes
    await state.search.getResult();
    //render to UI
    searchView.renderResults(state.search.result);
  }
};
elements.searchForm.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent reload
  controlSearch();
});
