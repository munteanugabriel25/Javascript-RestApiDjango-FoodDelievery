

class SearchView{
    _parentElement=document.querySelector(".search__container");


    getQuery(){
        return this._parentElement.querySelector(".search__for").value;
    }

    addHandlerSearch(handler){
        this._parentElement.addEventListener("submit", function(e){
            e.preventDefault();
            handler();
        })
    }

    clearInput(){
        this._parentElement.querySelector(".search__for").value="";
    }

}

export default new SearchView()