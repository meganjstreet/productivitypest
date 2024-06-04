class PomodorosController < ApplicationController

  def home
    @pomodoro = Pomordoro.new
    @session = Session.new

  end
end
