class WaterTrackersController < ApplicationController
  before_action :set_tracker, only: [:update]

  def new
    @water_tracker = WaterTracker.new
  end

  def create
    day = Day.find_or_create_by(date: Date.today, user: current_user)
    if day.persisted?
      water_tracker = day.water_trackers.create(water_tracker_params)
      if water_tracker.persisted?
        render json: water_tracker, status: :created
      else
        render json: { errors: water_tracker.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { errors: day.errors.full_messages }, status: :unprocessable_entity
    end
  end

 

  def update
    @water_tracker = WaterTracker.find(params[:id])
    @water_tracker.update(water_tracker_params)

    respond_to do |format|
      format.html
      format.text { render partial: "water_trackers/water_tracker", locals: {water_tracker: @water_tracker}, formats: [:html] }
    end
  end


  def take_glass_of_water
    @water_tracker = WaterTracker.find(params[:id])
    @water_tracker.current_amount += @water_tracker.increment_amount

    if @water_tracker.current_amount > @water_tracker.goal_amount
      respond_to do |format|
        format.html
        format.text { render partial: "water_trackers/water_tracker", locals: {water_tracker: @water_tracker, notice: 'You have drank enough, no more'}, formats: [:html] }
      end
    else
      @water_tracker.save!
      respond_to do |format|
        format.html
        format.text { render partial: "water_trackers/water_tracker", locals: {water_tracker: @water_tracker}, formats: [:html] }
      end
    end
  end


  private

  def set_tracker
    @water_tracker = WaterTracker.find(params[:id])
  end

  def water_tracker_params
    params.require(:water_tracker).permit(:goal_amount, :increment_amount, :frequency, :notification)
  end
end
