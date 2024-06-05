class PomodorosController < ApplicationController
  def create
    @day = Day.find_or_create_by(date: Date.today, user: current_user)
    @pomodoro = Pomodoro.create(status: 0)
    @pomodoro.day = @day
    @pomodoro.save
    render json: @pomodoro
  end

  def complete
    @pomodoro = Pomodoro.find(params[:id])
    @pomodoro.update(status: 1)
    render json: @pomodoro
  end
end
