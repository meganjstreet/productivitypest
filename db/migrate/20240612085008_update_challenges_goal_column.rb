class UpdateChallengesGoalColumn < ActiveRecord::Migration[7.1]
  def change
    change_column :challenges, :goal, 'integer USING CAST(goal AS integer)'
  end
end
