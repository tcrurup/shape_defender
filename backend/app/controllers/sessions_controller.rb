class SessionsController < ApplicationController

    def login
        user = User.find_by(username: session_params[:username])
        
        if(user && user.authenticate(session_params[:password]))
            render json: user.slice(:username)
        elsif(user)
            render json: { errors: "Incorrect Password" }
        else
            render json: { errors: "Username Not Found" }
        end
    end

    def sign_up
        user = User.new(username: session_params[:username], password: session_params[:password])

        if(user.save)
            render json: user.slice(:username)
        else
            render json: { errors: user.errors.full_messages }
        end
    end

    def submit_score
        user = User.find_by(username: session_params[:username])
        if user.highscore == nil || user.highscore < session_params[:score]
            user.highscore = session_params[:score] 
            user.save
        end
        render json: { message: 'Success'}
    end

    private

    def session_params
        params.require(:session).permit(:username, :password, :score)
    end

    
end