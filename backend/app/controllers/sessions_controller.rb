class SessionsController < ApplicationController

    def login
        user = User.find_by(username: session_params[:username])
        
        if(user && user.authenticate(session_params[:password]))
            render json: {message: ""}
        elsif(user)
            render json: {message: "Incorrect Password"}
        else
            render json: {message: "Username Not Found"}
        end
    end

    private

    def session_params
        params.require(:session).permit(:username, :password)
    end
end