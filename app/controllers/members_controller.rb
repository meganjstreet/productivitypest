class ChallengesController < ApplicationController
  def create

    @member = Member.new(member_params)
    @member.save

  end

  private

  def member_params
    params.require(:member).permit(:user, :challenge, :winner, :status)

  end
end
