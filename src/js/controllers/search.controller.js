// import Search from "./modules/search.module";
// import * as searchView from "./views/search.view";
// import {
//   elements,
//   renderLoader,
//   renderResults,
//   clearLoader,
//   clearResults,
// } from "./views/base";

// export const controlSearch = async ({ state }) => {
//   //get query from UI
//   const query = searchView.getInput();
//   if (query) {
//     //new search object and add to state
//     state.search = new Search(query);
//     //prepare UI for results
//     searchView.clearInput();
//     searchView.clearResults();
//     renderLoader(elements.searchRes);
//     //search for recipes
//     try {
//       await state.search.getResult();
//       //render to UI
//       clearLoader();
//       searchView.renderResults(state.search.result);
//     } catch (error) {
//       alert("Something wrong with the search...");
//     }
//   }
// };
