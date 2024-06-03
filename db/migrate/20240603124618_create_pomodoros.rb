class CreatePomodoros < ActiveRecord::Migration[7.1]
  def change
    create_table :pomodoros do |t|
      t.integer :status
      t.integer :session_count
      t.references :day, null: false, foreign_key: true

      t.timestamps
    end
  end
end
