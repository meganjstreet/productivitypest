class ScheduleTasksController < ApplicationController
  TIMES_ARRAY = %w[00:00 02:00 04:00 06:00 08:00 10:00 12:00 14:00 16:00 18:00 20:00 22:00 24:00]
  def create
    @schedule_task = ScheduleTask.new(schedule_task_params)
    @schedule = Schedule.find(params[:schedule_id])
    @schedule_task.schedule = @schedule
    @schedule_task.save
    respond_to do |format|
      format.html
      format.text { render partial: "schedules/schedule", locals: { schedule: @schedule, schedule_task: ScheduleTask.new, times:TIMES_ARRAY}, formats: [:html] }
    end
  end

  private

  def schedule_task_params
    params.require(:schedule_task).permit(:name, :start_time, :end_time)
  end
end
