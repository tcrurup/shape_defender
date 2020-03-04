class AppPortal{

    constructor(){
        this.element = this.createElement()
        this.submitType = AppPortal.submitTypes.login
    }

    static get submitTypes(){
        return {
            login : 'login',
            signup : 'signup'
        }
    }

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
        
        return element
    }

}