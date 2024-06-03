class CreateScheduleTasks < ActiveRecord::Migration[7.1]
  def change
    create_table :schedule_tasks do |t|
      t.string :name
      t.time :start_time
      t.time :end_time
      t.references :schedule, null: false, foreign_key: true

      t.timestamps
    end
  end
end
