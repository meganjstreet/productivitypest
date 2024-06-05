class AddDayReferenceToList < ActiveRecord::Migration[7.1]
  def change
    add_reference :lists, :day, null: false, foreign_key: true
  end
end
