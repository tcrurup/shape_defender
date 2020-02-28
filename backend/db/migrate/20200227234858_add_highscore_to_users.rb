class AddHighscoreToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column  :users, :highscore, :integer, :default => 0
  end
end
