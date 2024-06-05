class Day < ApplicationRecord
  belongs_to :user

  has_many :water_trackers

  validates :date, presence: true, uniqueness: { scope: :user_id }
  has_many :pomodoros
  has_many :schedules

end
