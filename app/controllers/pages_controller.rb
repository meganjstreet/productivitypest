class PagesController < ApplicationController

  def home
    # find todays Day instance
    @day = Day.find_or_create_by(date: Date.today, user_id: current_user.id)
    @water_tracker = WaterTracker.where(day_id: @day.id).first # returns array of WT with this date


    @user = current_user

  end
end
