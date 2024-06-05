class ChangeStatusOnListItem < ActiveRecord::Migration[7.1]
  def up
    change_column :list_items, :status, :boolean, using: 'status::boolean', default: false
  end

  def down
    change_column :list_items, :status, :string
  end
end
