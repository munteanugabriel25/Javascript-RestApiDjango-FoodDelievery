

class PaginationView {
    _parentElement = document.querySelector(".paginator")
    _data;

    render(data){
        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }


    _generateMarkup(){
        const currentPage = this._data.currentPage;
        const numPages = Math.ceil(this._data.search.lenght / this._data.search.resultsPerPage);
        
        // current page is no.1 and there are and other pages
        if(currentPage === 1 && numPages >1) {
            return`
                <button data-goto="${currentPage+1}" class="paginator__button">Page ${currentPage+1}<i class="fas fa-chevron-right"></i></button>
                `
        }
        // current page is last page
        if(currentPage===numPages  && numPages>1){
            return`
                <button data-goto="${currentPage-1}" class="paginator__button"><i class="fas fa-chevron-left"></i>Page ${currentPage-1}</button>
            `
        }

        // current page has previous and next page 
        if(currentPage < numPages){
            return`
            <button data-goto="${currentPage-1}" class="paginator__button"><i class="fas fa-chevron-left"></i>Page ${currentPage-1}</button>
            <button data-goto="${currentPage+1}" class="paginator__button">Page ${currentPage+1}<i class="fas fa-chevron-right"></i></button>
            `
        }
        // current page is page 1 and there are no other pages
        return ""
    }


    addHandlerPaginate(handler){
        this._parentElement.addEventListener("click", function(e){
            e.preventDefault();
            const element = e.closest(".paginator__button");
            if(!element) return;
            const goToPage = +element.dataset.goto
            handler(goToPage);
        })
    }

    _clear(){
        this._parentElement.innerHTML="";

    }


}

export default new PaginationView();
