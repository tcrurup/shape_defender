class CreatePresets < ActiveRecord::Migration[6.0]
  def change
    create_table :presets do |t|
      t.integer :user_id
      t.integer :enemyYVel
      t.integer :frameRate
      t.float :maxXIncrease
      t.integer :shootCooldown
      t.float :spawnCooldown
    end
  end
end
