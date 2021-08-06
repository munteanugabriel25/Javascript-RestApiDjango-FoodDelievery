
class LoginView{
    _parentElement = document.querySelector(".user__account__container");
    _formStatus = false;
    _form = document.querySelector(".user__details")

    addHandlerLogin(handler){
        this._parentElement.addEventListener("click", function(e){
            e.preventDefault()
            const element = e.target.closest("button")
            //second click when user submits to login
            if (element && this._formStatus) {
                handler();
            }

            // first click when form should be displayed
            if (element && !this._formStatus) this._showForm()
              
        }.bind(this))
    }1

    getUserPassword(){
        const user = this._parentElement.querySelectorAll("input")[0].value;
        const password = this._parentElement.querySelectorAll("input")[1].value;
        return user, password;
    }

    _showForm(){
        this._form.classList.remove("display__none")
        this._formStatus=true;
    }
    _hideForm(){
        console.log(this._form.classList)
        this._form.classList.add("display__none")
        this._formStatus=false;
    }

}


export default new LoginView()