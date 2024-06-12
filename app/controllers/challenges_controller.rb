class ChallengesController < ApplicationController
  def create
    @challenge = Challenge.new(challenge_params)
    @challenge.creator = current_user
    @challenge.start_date = Date.today
    @new_challenge = Challenge.new
    @new_challenge.challenge_participants.build

    # test

    respond_to do |format|
      if @challenge.save!
        format.html
        format.text { render partial: "challenges/all_challenges", locals: { challenge: @new_challenge }, formats: [:html]}
      end
    end
  end

  private

  def challenge_params
    params.require(:challenge).permit(:category, :stakes, :goal, :duration, :status, :start_date, challenge_participants_attributes: [:id, :user_id, :_destroy])
  end
end
