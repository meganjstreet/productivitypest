class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def home
    @water_trackers = WaterTracker.all
  end
end
