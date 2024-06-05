class WaterTrackersController < ApplicationController
  before_action :set_tracker, only: [:update, :take_glass_of_water]

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

  def reset
    today = Time.now.beginning_of_day
    yesterday = (today - 1.day).beginning_of_day
    WaterTracker.where(created_at: yesterday...today).update_all(current_amount: 0)
    head :no_content
  end

  def update
    @water_tracker = WaterTracker.find(params[:id])
    @water_tracker.update(water_tracker_params)

    respond_to do |format|
      format.html { redirect_to root_path_path }
      format.text { render partial: "water_strackers/water_tracker_infos", locals: {water_tracker: @water_tracker}, formats: [:html] }
    end
  end

  def destroy
    @water_tracker = WaterTracker.find(params[:id])
    @water_tracker.destroy
    head :no_content
  end

  def take_glass_of_water
    @water_tracker = WaterTracker.find(params[:id])
    @water_tracker.current_amount += @water_tracker.increment_amount

    if @water_tracker.current_amount >= @water_tracker.goal_amount
      redirect_to root_path, notice: 'You have drank enough, no more'
    else
      @water_tracker.save
      redirect_to root_path, notice: 'You just had a glass'
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
