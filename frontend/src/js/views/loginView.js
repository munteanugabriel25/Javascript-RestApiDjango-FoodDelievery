
class LoginView{
    _parentElement = document.querySelector(".user__account__container");
    _formStatus = false;
    _form = document.querySelector(".user__details");
    _data;
    _userLogedIn = false;


    _renderUserName(value){
        if(!value) this._parentElement.querySelector(".user__status").innerHTML=`logged as ${this._data.username}`;
        else this._parentElement.querySelector(".user__status").innerHTML=`${value}`;
    }
    
    successLogin(data){
        this._data = data;
        this._statusButtonSpinner(false);
        this._renderUserName();
        this._emptyFormInputs();
        this._changeButtonText("LOGOUT");
        this._hideForm();
        this._userLogedIn = true;
    }

    succesLogout(){
        this._userLogedIn = false;
        this._changeButtonText("LOGIN");
        this._renderUserName("log in to place an order")
    }


    addHandlerLoginLogout(login,logout){
        this._parentElement.addEventListener("click", function(e){
            e.preventDefault()
            const element = e.target.closest("button")
            if(!this._userLogedIn){
                //second click when user submits to login
                if (element && this._formStatus) {
                    login();
                }
                // first click when form should be displayed
                if (element && !this._formStatus) this._showForm();
            }else{
                // user wants to log out from the application
                logout();
            }
           

              
        }.bind(this))
    }


    ///True = active spinner, False = inactive spinner
    _statusButtonSpinner(boolValue){
        if(boolValue)this._parentElement.querySelector(".ispinner").classList.remove("display__none");
        else this._parentElement.querySelector(".ispinner").classList.add("display__none");
    }

    getUserPassword(){
        const user = this._parentElement.querySelectorAll("input")[0].value;
        const password = this._parentElement.querySelectorAll("input")[1].value;
        return[ user,password];
    }

    _emptyFormInputs(){
        const elements = this._parentElement.querySelectorAll("input");
        elements.forEach(element => element.value="");
    }

    _showForm(){
        this._form.classList.remove("display__none")
        this._formStatus=true;
    }
    _hideForm(){
        this._form.classList.add("display__none")
        this._formStatus=false;
    }

    _changeButtonText(value){
        this._parentElement.querySelector("button").textContent=value;
    }

}


export default new LoginView()