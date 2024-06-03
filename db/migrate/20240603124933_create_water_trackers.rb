class CreateWaterTrackers < ActiveRecord::Migration[7.1]
  def change
    create_table :water_trackers do |t|

      t.integer :goal_amount
      t.integer :increment_amount
      t.integer :frequency
      t.integer :current_amount
      t.integer :status
      t.boolean :notification
      t.references :day, null: false, foreign_key: true

      t.timestamps
    end
  end
end
