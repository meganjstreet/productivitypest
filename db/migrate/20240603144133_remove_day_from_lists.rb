class RemoveDayFromLists < ActiveRecord::Migration[7.1]
  def change
    remove_reference :lists, :day, index: true, foreign_key: true
  end
end
