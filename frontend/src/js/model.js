import {getJSON} from "./helpers.js"
import {URL_API} from "./config.js"
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
        console.log(state.search)

    }catch(error){
        console.error(error)
    }
}