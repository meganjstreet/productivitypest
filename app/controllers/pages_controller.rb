class PagesController < ApplicationController
  def home
    # find todays Day instance
    @day = Day.find_or_create_by(date: Date.today, user_id: current_user.id)

    @water_tracker = WaterTracker.find_or_create_by(day_id: @day.id)

    # LISTS
    @lists = current_user.lists.includes([:list_items])
    @new_list = List.new
    # LIST ITEMS
    @new_list_item = ListItem.new

    #find schedule for the day
    @schedule = Schedule.find_or_create_by(day_id: @day.id, date: Date.today)
    previous_schedule = current_user.schedules.order(:created_at).second_to_last

    if previous_schedule.present?
      recurring_tasks = previous_schedule.schedule_tasks.where(recurring: true)

      recurring_tasks.each do |task|
        ScheduleTask.find_or_create_by(
          name: task.name,
          start_time: task.start_time,
          end_time: task.end_time,
          recurring: true,
          schedule_id: @schedule.id
        )
      end
    end

    #instantiate new task for task form
    @schedule_task = ScheduleTask.new

    @challenge = Challenge.new
    @challenge.challenge_participants.build
  end
end
