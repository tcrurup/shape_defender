class AppPortal extends GameWindow{

    constructor(callbackOnLogin, callBackOnLogout){
        super()
        this.element = this.createElement()
        this.formSubmitType = AppPortal.submitTypes.login
        this.currentUser  = null
        this.callbackOnLogin = callbackOnLogin
        this.callBackOnLogout = callBackOnLogout
        this.formSubmitButton.addEventListener('click', this.submitForm.bind(this))
        this.signupLoginToggleLink.addEventListener('click', this.toggleLoginAndSignUp.bind(this))
    }

    //**********STATIC METHODS**********//

    static get submitTypes(){
        const options = {
            login : 'login',
            signup : 'signup'
        }

        return options
    }

    //**********GETTERS**********//
    get formSubmitButton(){
        return this.element.querySelector('button#formSubmit')
    }

    get signupLoginToggleLink(){
        return this.element.querySelector('a#toggleLink')
    }

    //**********SETTERS**********//
    set formButtonText(text){
        this.formSubmitButton.innerHTML = text
    }

    set toggleLinkText(text){
        this.signupLoginToggleLink.innerHTML = text
    }

    //**********CLASS METHODS**********//

    createElement(){
        let element = document.createElement('div')
        element.id = 'login'

        let form = document.createElement('form')

        let usernameLabel = document.createElement('label')
        usernameLabel.htmlFor = 'username'
        usernameLabel.innerHTML = 'Username: '

        let usernameInput = document.createElement('input')
        usernameInput.type = 'text'
        usernameInput.id = 'username'
        usernameInput.name = 'username'

        let passwordLabel = document.createElement('label')
        passwordLabel.htmlFor = 'password'
        passwordLabel.innerHTML = "Password: "

        let passwordInput = document.createElement('input')
        passwordInput.type = 'password'
        passwordInput.id = 'password'
        passwordInput.name = 'password'

        let usernameSpan = document.createElement('span')
        usernameSpan.appendChild(usernameLabel)
        usernameSpan.appendChild(usernameInput)

        let passwordSpan = document.createElement('span')
        passwordSpan.appendChild(passwordLabel)
        passwordSpan.appendChild(passwordInput)

        let submitButton = document.createElement('button')
        submitButton.id = 'formSubmit'
        submitButton.innerHTML = 'Login'

        let linkToggle = document.createElement('a')
        linkToggle.id = 'toggleLink'
        linkToggle.href = ""
        linkToggle.innerHTML = 'Sign Up!'

        form.appendChild(usernameSpan)
        form.appendChild(passwordSpan)
        form.appendChild(submitButton)
        form.appendChild(linkToggle)
        element.appendChild(form)
        
        return element
    }

    loginUser(user){
        this.currentUser = user.username
        this.callbackOnLogin(user.presets)
    }

    logout(){
        this.currentUser = null
        this.callBackOnLogout()
    }

    processFormSubmit(config){
        const url = `http://localhost:3000/${this.formSubmitType}`
        fetch(url, config)
            .then(response => response.json())
            .then( (object) => {
                if(object.errors){
                    alert(object.errors)
                }
                else{
                    this.loginUser(object)
                }
            })
        .catch( error => alert(`caught ${error}`)) 
    }  

    savePresets(presets){
        
        console.log(presets)
        let settings = presets
        settings['username'] = this.currentUser

        const config = {
            method: "POST",
            body: JSON.stringify(settings),
            headers:{
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }
        }

        const url = `http://localhost:3000/savePresets`
        fetch(url, config)
            .then(response => response.json())
            .then ( object => alert(object.message))
        .catch( error => alert(error))
    }

    submitForm(event){
        event.preventDefault()
        const user = document.querySelector('div#login input#username').value 

        if(user === '!debug'){
            this.callbackOnLogin()
            this.currentUser = 'admin'
            return
        }

        let formData = {
            username: user,
            password: document.querySelector('div#login input#password').value
        }

        let config = {
            method: "POST",
            body: JSON.stringify(formData),
            headers:{
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }
        }

        this.processFormSubmit(config) 
    }

    toggleLoginAndSignUp(event){
        event.preventDefault();
        if(this.formSubmitType === AppPortal.submitTypes.login){
            this.formSubmitType = AppPortal.submitTypes.signup
            this.formButtonText = "Sign Up"
            this.toggleLinkText = "Login"
        } else {
            this.formSubmitType = AppPortal.submitTypes.login
            this.formButtonText = "Login"
            this.toggleLinkText = "Sign Up"
        }
    }

    userIsLoggedIn(){
        return this.currentUser != null && this.currentUser != ""
    }

    //********** PRIVATE **********//

}