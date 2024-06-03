class ListItem < ApplicationRecord
  belongs_to :list, dependent: :destroy
end
