class PagesController < ApplicationController
  TIMES_ARRAY = %w[00:00 02:00 04:00 06:00 08:00 10:00 12:00 14:00 16:00 18:00 20:00 22:00 24:00]

  def home
    @times = TIMES_ARRAY
    @user = current_user
    @schedule = current_user.schedules.find_by(date: Date.today)
    @schedule_task = ScheduleTask.new
  end
end
