class ChallengesController < ApplicationController
  def create
    @challenge = Challenge.new(challenge_params)
    @challenge.creator = current_user
    @challenge.start_date = Date.today
    @new_challenge = Challenge.new
    @new_challenge.challenge_participants.build
    @challenge.save

    respond_to do |format|
      format.html
      format.text { render partial: "challenges/challenges", locals: { challenge: @new_challenge }, formats: [:html]}
    end

  end

  private

  def challenge_params
    params.require(:challenge).permit(:category, :stakes, :goal, :duration, :status, :start_date, challenge_participants_attributes: [:id, :user_id, :_destroy])
  end
end
