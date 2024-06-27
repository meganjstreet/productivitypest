class List < ApplicationRecord
  belongs_to :user
  has_many :list_items, dependent: :destroy
  validates :name, presence: true
  acts_as_list
end
