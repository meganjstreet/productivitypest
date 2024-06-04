class Pomodoro < ApplicationRecord
  belongs_to :day
  enum status: { active: 0, complete: 1 }
end
