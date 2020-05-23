import Search from "./modules/search.module";

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
  const query = queryArray[1];

  if (query) {
    //new search object and add to state
    state.search = new Search(query);
    //prepare UI for results

    //search for recipes
    await state.search.getResult();
    //render to UI
    console.log(state.search.result);
  }
};

document.querySelector(".search").addEventListener("submit", (event) => {
  event.preventDefault(); // prevent reload
  controlSearch();
});
