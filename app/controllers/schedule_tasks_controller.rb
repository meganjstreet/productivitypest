class ScheduleTasksController < ApplicationController

  def create
    @schedule_task = ScheduleTask.new(schedule_task_params)
    @schedule = Schedule.find(params[:schedule_id])
    @schedule_task.schedule = @schedule
    @schedule_task.save
    respond_to do |format|
      format.html
      format.text { render partial: "schedules/schedule", locals: { schedule: @schedule, schedule_task: ScheduleTask.new}, formats: [:html] }
    end
  end

  def destroy
    @schedule_task = ScheduleTask.find(params[:id])
    @schedule = @schedule_task.schedule
    @schedule_task.destroy
    respond_to do |format|
      format.html
      format.text { render partial: "schedules/schedule", locals: { schedule: @schedule, schedule_task: ScheduleTask.new}, formats: [:html] }
    end
  end

  private

  def schedule_task_params
    params.require(:schedule_task).permit(:name, :start_time, :end_time)
  end
end
