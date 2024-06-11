class CreateChallenges < ActiveRecord::Migration[7.0]
  def change
    create_table :challenges do |t|
      t.string :category
      t.string :stakes
      t.string :goal
      t.integer :duration
      t.date :start_date
      t.string :status
      t.references :creator, null: false, foreign_key: { to_table: :users }
      t.references :winner, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
