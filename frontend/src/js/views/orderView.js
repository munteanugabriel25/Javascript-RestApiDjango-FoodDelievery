


class OrderView {
    _data;
    _parentElement = document.querySelector(".modal__bg");


    render(data){
        this._visibility(true);
        this._data = data;
        this._clear();
        const markup = this._generateMarkup();
        this._parentElement.insertAdjacentHTML("afterbegin",markup);

    }



    addHandlerOrder(handlerSubmit, handlerUpdate){
        this._parentElement.addEventListener("click", function(e){
            //check to see wich action user performed : close modal window, delete product from cart, increase/decrease product quantity
            const action = e.target.closest("button")?.dataset.action;
            if(!action)return;
            if(action==="close") this._visibility(false);
            if(action==="remove") {
                const itemID = e.target.closest("li").getAttribute("id");
                // this._parentElement.querySelectorAll("li").forEach(element => element.getAttribute("id")===itemID? element.remove(): "");
                handlerUpdate(itemID,0);
            }
            if(action==="quantity"){
                const itemID = e.target.closest("li").getAttribute("id");
                const state  = e.target.closest("button").getAttribute("value");
                const quantity =  +(e.target.closest("div").querySelector("input").value);
                if(state==="increase")handlerUpdate(itemID,quantity+1);
                else handlerUpdate(itemID,quantity-1);
            }


        }.bind(this));
    }


    _generateMarkup(){
        return `
        <div class="modal__window">
                <div class="modal__header">
                    <p class="modal__header__text__title">Order Details</p>
                    <button data-action="close" class="modal__close__btn"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal__content">
                    <ul>
                        <li >
                            <div class="item__header">
                                <p></p>
                                <p class="modal__header__text">Name </p>
                                <p class="modal__header__text">Price </p>
                                <p class="modal__header__text">Quantity </p>
                                <p class="modal__header__text">Total</p>
                                <p class="modal__header__text">Remove </p>

                            </div>
                        </li>
                        ${this._data.items.map(item =>this._generateItemMarkup(item)).join('')}
                    </ul>

                        <button class="modal__place__order__btn">Total: ${this._data.totalValue}$ ->PLACE ORDER </button>
                      
                    </div>
                </div>
                
            </div>      
        `
    }
    _generateItemMarkup(item){
        return`
        <li id="${item.id}">
            <div class="item">
                <img src="${item.image}">
                <p> ${item.name}</p>
                <p class="modal__product__price">$ ${item.price} </p>
                <div class="modal__product__price__qty">
                        <button data-action="quantity" class="form__bnt__qty" value="decrease">-</button>
                        <input type="number" value="${item.quantity}" id="qty__input">
                        <button data-action="quantity" class="form__bnt__qty" value="increase">+</button>
                </div>
                <p class="modal__product__price">$${(item.price*item.quantity).toFixed(2)}</p>
                <button data-action="remove" class="modal__remove__btn"><i class="fas fa-times"></i></button>
            </div>
        </li>
        `
    }


    _clear(){
        this._parentElement.innerHTML="";
    }
    
    _visibility(stateBoolean){
        if(stateBoolean) this._parentElement.classList.remove("modal__hidden");
        else this._parentElement.classList.add("modal__hidden");
    }


}

export default new OrderView();
