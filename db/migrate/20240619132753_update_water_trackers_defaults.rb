class UpdateWaterTrackersDefaults < ActiveRecord::Migration[7.0]
  def change
    change_column_default :water_trackers, :current_amount, 0
    change_column_default :water_trackers, :status, 0
    change_column_default :water_trackers, :notification, false
  end
end
