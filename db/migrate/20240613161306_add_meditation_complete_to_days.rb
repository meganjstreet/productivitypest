class AddMeditationCompleteToDays < ActiveRecord::Migration[7.1]
  def change
    add_column :days, :meditation_complete, :boolean, default: false
  end
end
