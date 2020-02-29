class ScoreList

    def initialize(user)
        @user = user
    end

    def compile_list()
        sorted_list = User.all.sort_by{ |user| user.highscore }.reverse
        user_rank = sorted_list.index(@user) + 1 
        
        score_list = {
            :'1' => "#{sorted_list[0].username}  -  #{sorted_list[0].highscore}",
            :'2' => "#{sorted_list[1].username}  -  #{sorted_list[1].highscore}",
            :'3' => "#{sorted_list[2].username}  -  #{sorted_list[2].highscore}"
        }

        if user_rank > 3
            indexed_rank = user_rank - 2 
            sorted_list.slice(user_rank - 3, 5).each do |user|
                score_list["#{indexed_rank}".to_sym] = "#{user.username}  -  #{user.highscore}"
                indexed_rank += 1
            end
        else
            score_list[:'4'] = "#{sorted_list[3].username}  -  #{sorted_list[3].highscore}"
            score_list[:'5'] = "#{sorted_list[4].username}  -  #{sorted_list[4].highscore}"
        end

        score_list
    end

end