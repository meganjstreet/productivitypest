class DaysController < ApplicationController
  def create
    @day = Day.create(date: Date.today, user: current_user)
  end

  def update
    @day = Day.find(params[:id])
    @day.meditation_complete = true
    @day.save!

    respond_to do |format|
      format.html
      format.text { render partial: "meditations/meditations", formats: [:html] }
    end
  end
end
