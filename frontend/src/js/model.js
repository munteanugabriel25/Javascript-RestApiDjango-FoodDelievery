import {getJSON,postJSON} from "./helpers.js"
import {URL_API,LOGIN_URL} from "./config.js"
import {RESULTS_PER_PAGE} from "./config.js"

export const state = {
    item :{},
    quantity:{},
    search :{
        query:"",
        results: [],
        resultsPerPage:RESULTS_PER_PAGE,
        currentPage:1
    },
    kart:{
        items: [],
        itemsNumber :0,
        totalValue : 0,
    },
    user:{
        username:"",
        token:"",
        orders:[]
    },
    updateCartTotaltems : function(){
        this.kart.itemsNumber = this.kart.items.length;
    },
    updateCartTotalValue : function(){
        const total = this.kart.items.reduce(function(summ,item){
            return summ+(item.quantity*item.price)
        },0)
        this.kart.totalValue = total.toFixed(2);
    }


}


export const loadItem =  async function(id){
    try {
        const data = await getJSON(`${URL_API}/${id}`);
        state.item = data;
    }catch(error){
        console.error(error)
    }
}


export const loadSearchResults = async function(query){
    try {
        data = await getJSON(`${URL_API}/?search=${query}`);
        // console.log(data);
        state.search.query=query;
        state.search.results=data;
        state.search.currentPage=1;

    }catch(error){
        console.error(error)
    }
}

export const getSearchResultsPage =  function(page=state.search.currentPage){
    state.search.currentPage=page;
    const start = (page -1)*state.search.resultsPerPage;
    const end = page*state.search.resultsPerPage;
    return state.search.results.slice(start, end);

}

export const getCategoryItems = async function(category){
    try {
        data = await getJSON(`${URL_API}/category/${category}`);
        state.search.query = category;
        state.search.results = data;
        state.search.currentPage=1;

    }catch(error){
        console.error(error)
    }
}

export const AddToKart = function(quantity=1){
    const orderedItem = Object.assign({},state.item)
    orderedItem.quantity = quantity;
    addCheckDuplicity(orderedItem)
}

export const changeStateCurrentItem = function(id){
    const object =  state.search.results.find(itemObject=> itemObject.id=id);
    state.item = object;
}

export const userLogin = async function([username,password]){
    try {
        const obj={
            "username":username,
            "password":password
        }
        data = await postJSON(LOGIN_URL,"undefined", obj)
        state.user.username=data.username;
        // state.user.orders =data.orders;
        state.user.token=data.token;
        console.log(state.user)
        await waitTimmer();

    }catch(error){

    }
}

const addCheckDuplicity= function(itemObject){
    // check it ordered item is allready into kart.items
    const exists = state.kart.items.some(item => item.id===itemObject.id)
    if(exists){
        const item = state.kart.items.forEach(item => {
            if(item.id===itemObject.id) item.quantity +=itemObject.quantity
        });
    }else{
        state.kart.items.push(itemObject)
    }
    //after adding product to kart, update Kart total value and number of items.

    state.updateCartTotalValue();
    state.updateCartTotaltems();
}


export const updateCart = function(itemID, quantity){
    if(quantity!=0) state.kart.items.forEach(item =>{
        if(item.id === itemID) item.quantity=quantity
    });
    else{
        const index=state.kart.items.findIndex(item => item.id === itemID)
        state.kart.items.splice(index, 1);
    }
    state.updateCartTotalValue();
    state.updateCartTotaltems();
}


const waitTimmer = function(){
    return new Promise(function(resolve, _){
        setTimeout(function(){
            resolve()
        }, 2000)
    })
}