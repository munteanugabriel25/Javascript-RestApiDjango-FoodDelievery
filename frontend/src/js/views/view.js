import basketIcon from "url:../../images/item.svg";


class View{
    _data;
    _parentElement = document.querySelector(".product__detail");
    _spicyText = ["Really, you can manage it" , "It's not that damn hot", "Be careful ...", "Hot as hell" , "Prepare yourself to cry ..."]

    render(data){
        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin",markup)
    }

    renderSpinner(){
        const html=`
        <div class="ring">Loading
            <span></span>
        </div>
        `
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", html);
    }

    _clear() {
        this._parentElement.innerHTML="";
    }

    _generateMarkupIngredient(ingredient) {
        return `
        <div class="ingredient__container">
            <img class="ingredient_icon" src="${basketIcon}">
            <div class="ingredient_info">
                <p class="ingredient_name"> ${ingredient.name}</p>
                <p class="ingredient_weight"> ${ingredient.quantity} ${ingredient.unit}</p>
            </div>
        </div>
        `
    }

    _generateMarkupSpicy(value){
        let html="";
        for(let i=1;i<=5;i++){
            if(i<=value){
                html +='<i class="hot fas fa-pepper-hot"></i>'
            } else html +='<i class="mild fas fa-pepper-hot"></i>'
        }
        return html

    }

    addHandlerRender(handler){
        ["hashchange"].forEach(element => window.addEventListener(element, handler));
    }

    addHandlerQuantity(handler){
        this._parentElement.addEventListener("click", function(e){
            e.preventDefault();
            const element = e.target.closest(".form__bnt__qty")
            if(!element) return;
            const state = element.getAttribute("value");
            handler(state);

        })
    }

    changeQuantity(state){
        const input = this._parentElement.getElementsByTagName("input")[0];
        if (state==="increase") input.value = (+input.value)+1;
        if (state==="decrease" && ((+input.value)-1)>= 1) input.value = (+input.value)-1;
    }

    _generateMarkup(){
        return`
        <div class="product__picture">
            <div class="picture__container">
                <img  src="${this._data.image}">
            </div>
        </div>
                
        <div class="product__info">
            <div>
                <p class="product__title">${this._data.name}</p>
                <div class="product__rating">
                    ${this._generateMarkupSpicy(this._data.spicy)}
                    <span>${this._spicyText[this._data.spicy-1]}</span>
                </div>
            </div>
            <p class="product__description">${this._data.description}</p>
            <form class="product__qty__form">
                <div class="product__price__qty">
                    <div class="input__container"> 
                        <button class="form__bnt__qty" value="decrease">-</button>
                        <input type="number" value="1">
                        <button class="form__bnt__qty" value="increase">+</button>
                    </div>
                    <p class="product__price">Price: <span>$${this._data.price}</span> </p>
                </div>
                <button class="btn__form__add" type="submit">add to kart</button>
            </form>
            <div class="product__ingredients">
                ${this._data.ingredients.map(ingredient => this._generateMarkupIngredient(ingredient)).join("")}   
            </div>
        </div>
        `
    }

}



export default new View();