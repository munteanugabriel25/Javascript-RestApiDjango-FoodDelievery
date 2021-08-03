

class resultsView {
    _parentElement = document.querySelector(".preview__container")
    _data;


    render(data) {
        this._data = data;
        const html = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", html)
    }

    _generateMarkup(){
        const html = this._data.map(result=>{
            return`<a  href="#${result.id}" class="preview__card">
                    <div class="back__line">
                    </div>
                    <div class="preview__product">
                        <div class="preview__picture">
                             <img src="${result.image}">
                        </div>
                        <div class="preview__product__details">
                             <p class="preview__product__title">${result.name}</p>
                             <p class="preview__product__ingredients">${result.name}</p>
                             <p class="preview__product__price"><i class="fas fa-dollar-sign"></i> ${result.price}</p>
                        </div>
                       
                        <button class="btn__preview__add">+</button>
                     </div>
                </a>
        `})
        return html.join("")
    }


    renderSpinner(){
        this._clear();
        const html=`
        <div class="ring">Loading
            <span></span>
        </div>
        `
        this._parentElement.insertAdjacentHTML("afterbegin", html);
    }

    _clear() {
        this._parentElement.innerHTML="";
    }


}

export default new resultsView();