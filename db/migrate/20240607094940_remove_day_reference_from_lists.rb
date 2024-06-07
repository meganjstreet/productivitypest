class RemoveDayReferenceFromLists < ActiveRecord::Migration[7.1]
  def change
    remove_reference :lists, :day, null: false, foreign_key: true
  end
end
