class PagesController < ApplicationController
  TIMES_ARRAY = %w[00:00 02:00 04:00 06:00 08:00 10:00 12:00 14:00 16:00 18:00 20:00 22:00 24:00]

  def home

    @times = TIMES_ARRAY

    # find todays Day instance
    @day = Day.find_or_create_by(date: Date.today, user_id: current_user.id)


    # returns array of WT with this date
    @water_tracker = @day.water_trackers.first

    #find current user
    @user = current_user

    # LISTS
    @lists = @user.lists
    @new_list = List.new
    # LIST ITEMS
    @new_list_item = ListItem.new

    #find schedule for the day
    @schedule = Schedule.find_by(day_id: @day.id)


    #instantiate new task for task form
    @schedule_task = ScheduleTask.new

    @challenge = Challenge.new
    @challenge.challenge_participants.build

  end
end
