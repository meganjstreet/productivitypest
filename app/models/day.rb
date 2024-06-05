class Day < ApplicationRecord
  belongs_to :user
  has_many :water_trackers
end
