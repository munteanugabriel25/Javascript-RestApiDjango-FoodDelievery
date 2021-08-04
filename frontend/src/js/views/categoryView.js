

class CategoryView {
    _data;
    _parentElement = document.querySelector(".menu__bar")

    markCurrentCateg(data){
        this._data = data
        console.log(this._data)
        this.clearMarkedCateg();
        const currentLink = [...this._parentElement.querySelectorAll("a")].find(element=> element.dataset.category===this._data.query)
        currentLink.classList.add("active__category")
    }

    addHandlerClickCategory(handler){
        this._parentElement.addEventListener("click", function(e){
            e.preventDefault();
            const button = e.target.closest("a");
            const category = button.dataset.category;
            handler(category);
        })
    }
    
    clearMarkedCateg(){
        const allLinks = this._parentElement.querySelectorAll("a");
        allLinks.forEach(link => link.classList.remove("active__category"))
    }
    
}


export default new CategoryView()
