class ScheduleTask < ApplicationRecord
  belongs_to :schedule
  validates :name, :start_time, :end_time, presence: true
end
