
class KartView{
    _data;
    _parentElement= document.querySelector(".cart__container")

    render(data){
        console.log(data);
        this._data = data;
        this._clear();
        const markup = this._generateMarkup();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }

    _clear() {
        this._parentElement.innerHTML="";
    }

    _generateMarkup(){
        return `
        <div class="cart__details">
            <p> ${this._data.itemsNumber} dishees</p>
            <p> <i class="fas fa-dollar-sign"></i>  ${this._data.totalValue}</p>
            <p> <i class="fas fa-shopping-cart"></i> kart</p>
        </div>
        <button class="btn__kart">ORDER</button>
        `
    }

    addHandlerOrder(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const element = e.target.closest('button');
            if (!element) return;
            handler();
        })
    }

}


export default new KartView();