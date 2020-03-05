class AppPortal{

    constructor(){
        this.element = this.createElement()
        this.formSubmitType = AppPortal.submitTypes.login
        this.currentUser  = null


        this.element.querySelector('button#formSubmit').addEventListener('click', this.submitForm.bind(this))
    }

    //**********STATIC METHODS**********//

    static get submitTypes(){
        const options = {
            login : 'login',
            signup : 'signup'
        }

        return options
    }

    //**********SETTERS**********//

    set elementDisplay(type){
        this.element.style.display = type
    }

    //**********CLASS METHODS**********//

    createElement(){
        let element = document.createElement('div')
        element.className = 'login'

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
        passwordLabel.innerHTML = "Passoword: "

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
        element.style.display = 'none'
        
        return element
    }

    hide(){
        this.elementDisplay = 'none'
    }

    loginUser(user){
        this.currentUser = user.username
    }

    logout(){
        this.currentUser = null
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
        .catch( error => alert(error)) 
    }

    show(){
        this.elementDisplay = 'flex'
    }    

    submitForm(event){
        event.preventDefault()

        let formData = {
            username: document.querySelector('div.login input#username').value,
            password: document.querySelector('div.login input#password').value
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

    userIsLoggedIn(){
        return this.currentUser != null && this.currentUser != ""
    }

}