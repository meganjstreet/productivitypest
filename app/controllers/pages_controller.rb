class PagesController < ApplicationController

  def home

    @water_trackers = WaterTracker.all

    @user = current_user

  end
end
