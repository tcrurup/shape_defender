class ScoreListSerializer

    def initialize(score_list)
        @score_list = score_list
    end

    def to_serialized_json
        @score_list.to_json()
    end


end