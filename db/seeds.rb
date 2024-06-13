# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

ListItem.destroy_all
List.destroy_all

Challenge.destroy_all
Pomodoro.destroy_all
ScheduleTask.destroy_all
Schedule.destroy_all
WaterTracker.destroy_all
Day.destroy_all
User.destroy_all

user = User.create!(username: "Nolu", email: "nolu@gmail.com", password: "1234567")
days = (0..7).map do |i|
  Day.create!(date: Date.today + i.days, user_id: user.id, meditation_complete: [true, true, true, false, false].sample)
end

(1..7).map do |i|
  List.create!(name: "List #{i}", user_id: user.id)
end

days.each do |day|
  Schedule.create!(
    date: day.date,
    day: day
  )
  WaterTracker.create!(
    goal_amount: 2000,
    increment_amount: 250,
    frequency: 30,
    current_amount: 0,
    status: [0, 1,1,1,1, 0, 0].sample.to_i,
    notification: false,
    day: day
  )
end


puts "seeds complete"
