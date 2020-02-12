class SessionsController < ApplicationController

    def login
        user = User.find_by(username: session_params[:username])
        
        if(user && user.authenticate(session_params[:password]))
            render json: {saved_games: user.saved_games}
        elsif(user)
            render json: {}
        else
            render json: {user: false}
        end
    end

    private

    def session_params
        params.require(:session).permit(:username, :password)
    end
end