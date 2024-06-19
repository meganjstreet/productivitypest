class PagesController < ApplicationController
  def home
    # find todays Day instance
    @day = Day.find_or_create_by(date: Date.today, user_id: current_user.id)

    @water_tracker = WaterTracker.find_or_create_by(goal_amount: 2000,
      increment_amount: 250,
      frequency: 30,
      current_amount: 0,
      status: 0,
      notification: false,
      day_id: @day.id)

    # LISTS
    @lists = current_user.lists.includes([:list_items])
    @new_list = List.new
    # LIST ITEMS
    @new_list_item = ListItem.new

    #find schedule for the day
    @schedule = Schedule.find_or_create_by(day_id: @day.id, date: Date.today)

    #instantiate new task for task form
    @schedule_task = ScheduleTask.new

    @challenge = Challenge.new
    @challenge.challenge_participants.build
  end
end
