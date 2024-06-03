class UpdateGoalAmountInWaterTracker < ActiveRecord::Migration[7.1]
  change_table :water_trackers do |t|
    t.change :goal_amount, :integer, default: 2000
    t.change :increment_amount, :integer, default: 250
    t.change :frequency, :integer, default: 30
  end
end
