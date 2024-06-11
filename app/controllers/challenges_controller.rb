class ChallengesController < ApplicationController
  def create
    @challenge = Challenge.new(challenge_params)
    @challenge.creator = current_user
    @challenge.start_date = Date.today
    @new_challenge = Challenge.new
    @new_challenge.challenge_participants.build

    respond_to do |format|
      if @challenge.save
        format.json { render json: { partial: render_to_string(partial: "challenges/form", locals: { challenge: @new_challenge })}, status: :created }
      else
        format.json { render json: { partial: render_to_string(partial: "challenges/form", locals: { challenge: @new_challenge }), errors: @challenge.errors.full_messages }, status: :unprocessable_entity }
      end
    end
  end

  private

  def challenge_params
    params.require(:challenge).permit(:category, :stakes, :goal, :duration, :status, :start_date, challenge_participants_attributes: [:id, :user_id, :_destroy])
  end
end
