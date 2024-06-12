# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
    super
    day = Day.find_or_create_by(date: Date.today, user_id: current_user.id)
    Schedule.find_or_create_by(day_id: day.id, date: Date.today)
    WaterTracker.find_or_create_by(goal_amount: 2000,
      increment_amount: 250,
      frequency: 30,
      current_amount: 0,
      status: [0, 1,1,1,1, 0, 0].sample.to_i,
      notification: false,
      day: day)
    
  end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
