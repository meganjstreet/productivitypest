class PagesController < ApplicationController

  def home

    @water_trackers = WaterTracker.all

    @user = current_user
    # TODAY
    @day = @user.days.last
    # LISTS
    @lists = @user.lists
    # LIST ITEMS
    @list_item = ListItem.new

  end
end
