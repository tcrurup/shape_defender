class UserSerializer

    def initialize(user)
        @user = user
    end

    def to_serialized_json
        puts "*****#{@user.presets}*****"
        options = {
            include: {
                presets:{
                    except: [:id, :user_id]
                }
            }, 
            only: [:username]
        }
        @user.to_json(options)
    end
end
