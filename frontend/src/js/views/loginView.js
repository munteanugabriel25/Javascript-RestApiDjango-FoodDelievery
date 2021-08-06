
class LoginView{
    _parentElement = document.querySelector(".user__account__container");
    _formStatus = false;
    _form = document.querySelector(".user__details");
    _data;


    _renderUserName(){
        this._parentElement.querySelector(".user__status").innerHTML=`logged as ${this._data.username}`;
    }
    
    successLogin(data){
        this._stopButtonSpinner();
        this._renderUserName()
    }

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
    }

    _startButtonSpinner(){
        this._parentElement.querySelector(".ispinner").classList.remove("display__none");
    }

    _stopButtonSpinner(){
        this._parentElement.querySelector(".ispinner").classList.add("display__none");
    }


    getUserPassword(){
        const user = this._parentElement.querySelectorAll("input")[0].value;
        const password = this._parentElement.querySelectorAll("input")[1].value;
        return[ user,password];
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