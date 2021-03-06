import * as model from './model.js' 
import itemView from './views/view.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import paginationView from './views/paginationView.js'
import categoryView from './views/categoryView.js'
import kartView from './views/kartView.js'
import loginView from './views/loginView.js'
import orderView from './views/orderView.js'

const controlItem = async function(){
    try {
        const id = window.location.hash.slice(1);
        if(!id)return;
        itemView.renderSpinner()
        await model.loadItem(id)
        itemView.render(model.state.item)
        itemView.addHandlerAddToKart(controlAddToKart);
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
        itemView.addHandlerAddToKart(controlAddToKart);
        paginationView.render(model.state.search);
        
    }
    catch(error){
        
    }
}


const controlMenuCategDisplay = async function (categoryClicked){
    try {
        resultsView.renderSpinner();
        await model.getCategoryItems(categoryClicked);
        resultsView.render(model.getSearchResultsPage());
        paginationView.render(model.state.search);
        itemView.addHandlerAddToKart(controlAddToKart);
        categoryView.markCurrentCateg(model.state.search);



    }catch(error){
        console.log(error);
    }
    
}

const controlPagination = function(goToPage){
    resultsView.render(model.getSearchResultsPage(goToPage));
    paginationView.render(model.state.search);
}   


const controlChangeQuantity = function (state){
    itemView.changeQuantity(state);
}

const controlAddToKart = function(quantity){
    model.AddToKart(quantity);
    kartView.render(model.state.kart);
}

const controlHashChange = function(id){
    model.changeStateCurrentItem(id);
    model.AddToKart();
    kartView.render(model.state.kart);
}

const controlLogin = async function (){
    try{
        loginView._statusButtonSpinner(true);
        await model.userLogin(loginView.getUserPassword())
        loginView.successLogin(model.state.user);

    }catch(error){
        console.log(error);
    }
}

const controlLogout = function() {
    loginView.succesLogout();
}


const controlOrderAction  = function(){
    orderView.render(model.state.kart)
}

const controlUpdateCart = function(itemID, quantity){
    model.updateCart(itemID, quantity);
    orderView.render(model.state.kart);
    kartView.render(model.state.kart);
    
}





const init = function(){
    searchView.addHandlerSearch(controlSearchResults);
    itemView.addHandlerRender(controlItem);
    itemView.addHandlerQuantity(controlChangeQuantity);
    paginationView.addHandlerPaginate(controlPagination);
    categoryView.addHandlerClickCategory(controlMenuCategDisplay);
    resultsView.addHandlerHashChange(controlHashChange);
    loginView.addHandlerLoginLogout(controlLogin, controlLogout);   
    kartView.addHandlerOrder(controlOrderAction);
    orderView.addHandlerOrder(controlOrderAction,controlUpdateCart);

}

init()
