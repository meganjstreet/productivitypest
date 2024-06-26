class AddRecurringColumnToScheduleTasks < ActiveRecord::Migration[7.1]
  def change
    add_column :schedule_tasks, :recurring, :boolean, default: false
  end
end
