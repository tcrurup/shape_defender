class SessionsController < ApplicationController

    def login
        user = User.find_by(username: session_params[:username])
        
        if(user && user.authenticate(session_params[:password]))
            render json: UserSerializer.new(user).to_serialized_json
        elsif(user)
            render json: { errors: "Incorrect Password" }
        else
            render json: { errors: "Username Not Found" }
        end
    end

    def save_presets
        user = User.find_by(username: session_params[:username])
        user.createOrUpdatePreset(1, preset1_params)
        user.createOrUpdatePreset(2, preset2_params)
        user.createOrUpdatePreset(3, preset3_params)
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
        puts session_params[:username]
        user = User.find_by(username: session_params[:username])
        puts user
        if user.highscore == nil || user.highscore < session_params[:score]
            user.highscore = session_params[:score] 
            user.save
        end
        score_list = ScoreList.new(user).compile_list()
        render json: ScoreListSerializer.new(score_list).to_serialized_json()
    end

    

    private

    def session_params
        params.require(:session).permit(:username, :password, :score)
    end 
    
    def preset1_params
        params.require(:preset1).permit(:frameRate, :spawnCooldown, :shootCooldown, :enemyYVel, :maxXIncrease)
    end

    def preset2_params
        params.require(:preset2).permit(:frameRate, :spawnCooldown, :shootCooldown, :enemyYVel, :maxXIncrease)
    end

    def preset3_params
        params.require(:preset3).permit(:frameRate, :spawnCooldown, :shootCooldown, :enemyYVel, :maxXIncrease)
    end

end