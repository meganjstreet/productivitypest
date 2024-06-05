class Schedule < ApplicationRecord
  belongs_to :day
  has_many :schedule_tasks
  validates :date, presence: true, uniqueness: { scope: :user_id }
end
