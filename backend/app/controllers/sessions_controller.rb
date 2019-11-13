class SessionsController < ApplicationController

    def login
        user = User.find_by(username: session_params[:username])
        
        if(user && user.authenticate(session_params[:password]))
            raise'success'
        elsif(user)
            raise'password is incorrect'
        else
            raise 'not valid'
        end
    end

    private

    def session_params
        params.require(:session).permit(:username, :password)
    end
end