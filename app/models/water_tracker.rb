class WaterTracker < ApplicationRecord
  belongs_to :day
  enum status: { incomplete: 0, complete: 1 }
  validates uniqueness: { scope: :day_id }
end
