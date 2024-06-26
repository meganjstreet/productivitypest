class ScheduleTasksController < ApplicationController
  def create
    @schedule_task = ScheduleTask.new(schedule_task_params)
    @schedule = Schedule.find(params[:schedule_id])
    @schedule_task.schedule = @schedule
    respond_to do |format|
      if @schedule_task.save
        format.html { render partial: "schedules/schedule", locals: { schedule: @schedule, schedule_task: ScheduleTask.new }, formats: [:html] }
        format.text { render partial: "schedules/schedule", locals: { schedule: @schedule, schedule_task: ScheduleTask.new }, formats: [:html] }
      else
        format.html { render partial: "schedules/form", locals: { schedule: @schedule, schedule_task: @schedule_task }, formats: [:html], status: :unprocessable_entity }
        format.text { render partial: "schedules/form", locals: { schedule: @schedule, schedule_task: @schedule_task }, formats: [:html], status: :unprocessable_entity }
      end
    end
  end

  def update
    @schedule_task = ScheduleTask.find(params[:id])
    @schedule = Schedule.find(params[:schedule_id])
    @schedule_task.update(schedule_task_params)
    respond_to do |format|
      if @schedule_task.save
        format.html { render partial: "schedules/schedule", locals: { schedule: @schedule, schedule_task: ScheduleTask.new }, formats: [:html] }
        format.text { render partial: "schedules/schedule", locals: { schedule: @schedule, schedule_task: ScheduleTask.new }, formats: [:html] }
      else
        format.html { render partial: "schedules/form", locals: { schedule: @schedule, schedule_task: @schedule_task }, formats: [:html], status: :unprocessable_entity }
        format.text { render partial: "schedules/form", locals: { schedule: @schedule, schedule_task: @schedule_task }, formats: [:html], status: :unprocessable_entity }
      end
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
    params.require(:schedule_task).permit(:name, :start_time, :end_time, :recurring)
  end
end
