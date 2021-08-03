import * as model from './model.js' 
import itemView from './views/view.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import paginationView from './views/paginationView.js'


const controlItem = async function(){
    try {
        const id = window.location.hash.slice(1);
        if(!id)return;
        itemView.renderSpinner()
        await model.loadItem(id)
        itemView.render(model.state.item)
    } 
    catch(error){

    }
}


const controlSearchResults = async function(){
    try {
        resultsView.renderSpinner();
        const query = searchView.getQuery();
        searchView.clearInput();
        if(!query) return;
        await model.loadSearchResults(query);
        resultsView.render(model.getSearchResultsPage());
        paginationView.render(model.state.search);
        
    }
    catch(error){

    }
}

const controlPagination = function(goToPage){
    resultsView.render(model.getSearchResultsPage(goToPage));
    paginationView.render(model.state.search);
}   


const controlChangeQuantity = function (state){
    itemView.changeQuantity(state);
}

const init = function(){
    searchView.addHandlerSearch(controlSearchResults);
    itemView.addHandlerRender(controlItem);
    itemView.addHandlerQuantity(controlChangeQuantity);
    paginationView.addHandlerPaginate(controlPagination);

}

init()
