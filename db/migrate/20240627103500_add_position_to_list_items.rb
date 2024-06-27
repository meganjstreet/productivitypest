class AddPositionToListItems < ActiveRecord::Migration[7.1]
  def change
    add_column :list_items, :position, :integer
  end
end
