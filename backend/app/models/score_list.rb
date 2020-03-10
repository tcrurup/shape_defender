class ScoreList

    def initialize(user)
        @user = user
    end

    def compile_list()
        sorted_list = User.all.sort_by{ |user| user.highscore }.reverse
        user_index = sorted_list.index(@user)
        user_rank = user_index + 1
        
        
        score_list = {}

        if user_rank < 20
            rank = 1
            sorted_list.slice(0, 20).each do |user|
                score_list["#{rank}".to_sym] = [user.username, user.highscore]
                rank += 1
            end
        else
            score_list = {
                :'1' => [sorted_list[0].username, sorted_list[0].highscore],
                :'2' => [sorted_list[1].username, sorted_list[1].highscore],
                :'3' => [sorted_list[2].username, sorted_list[2].highscore]
            }
            rank = user_rank - 8

            sorted_list.slice(user_index - 8, 17).each do |user|
                score_list["#{rank}".to_sym] = [user.username, user.highscore]
                rank += 1
            end
        end

        score_list
    end

end