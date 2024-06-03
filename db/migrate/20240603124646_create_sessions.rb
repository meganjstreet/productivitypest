class CreateSessions < ActiveRecord::Migration[7.1]
  def change
    create_table :sessions do |t|
      t.integer :status
      t.time :start_time
      t.references :pomodoro, null: false, foreign_key: true

      t.timestamps
    end
  end
end
