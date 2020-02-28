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
        render json: compile_score_list(user)
    end

    

    private

    def session_params
        params.require(:session).permit(:username, :password, :score)
    end

    def compile_score_list(user)
        sorted_list = User.all.sort_by{ |user| user.highscore }.reverse
        user_index = sorted_list.index(user) 
        score_list = {
            1 => sorted_list[0],
            2 => sorted_list[1],  #Get the users with the top three scores
            3 => sorted_list[2],
            (user_index - 2) => sorted_list[user_index - 2],
            (user_index - 1) => sorted_list[user_index - 1],
            (user_index) => sorted_list[user_index],
            (user_index + 1) => sorted_list[user_index + 1],
            (user_index + 2) => sorted_list[user_index + 2]
        }
    end

    
end