class DaysController < ApplicationController
  def create
    @day = Day.new(date: Date.today)
  end
end
