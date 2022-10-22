import * as model from "./model.js";
import SearchView from "./SearchView.js";
import locationView from "./locationView.js";

const getLoadedData = async function () {
  try {
    await model.loadApi(model.state.currentPosition);

    locationView.renderSpinner();

    setTimeout(() => {
      locationView.getCurrentPositionData(model.state.currentPosition);
    }, 5000);
  } catch (err) {
    locationView.RenderError();
  }
};
getLoadedData();

const controlSearchResults = async function () {
  try {
    const query = SearchView.getQuery();
    if (!query) return;
    SearchView.renderSpinner();
    await model.loadSearchResults(query);

    SearchView.getSearchPositionData(model.state.search.result);
  } catch (err) {
    SearchView.renderError();
  }
};

const innit = function () {
  SearchView.addHandlerSearch(controlSearchResults);
};
innit();
