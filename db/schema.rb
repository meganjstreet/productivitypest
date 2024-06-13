# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_06_13_161306) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "challenge_participants", force: :cascade do |t|
    t.bigint "challenge_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["challenge_id"], name: "index_challenge_participants_on_challenge_id"
    t.index ["user_id"], name: "index_challenge_participants_on_user_id"
  end

  create_table "challenges", force: :cascade do |t|
    t.string "category"
    t.string "stakes"
    t.integer "goal"
    t.integer "duration"
    t.date "start_date"
    t.string "status"
    t.bigint "creator_id", null: false
    t.bigint "winner_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creator_id"], name: "index_challenges_on_creator_id"
    t.index ["winner_id"], name: "index_challenges_on_winner_id"
  end

  create_table "days", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.date "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "meditation_complete", default: false
    t.index ["user_id"], name: "index_days_on_user_id"
  end

  create_table "list_items", force: :cascade do |t|
    t.string "name"
    t.string "priority"
    t.boolean "status", default: false
    t.bigint "list_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["list_id"], name: "index_list_items_on_list_id"
  end

  create_table "lists", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_lists_on_user_id"
  end

  create_table "pomodoros", force: :cascade do |t|
    t.integer "status"
    t.integer "session_count"
    t.bigint "day_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["day_id"], name: "index_pomodoros_on_day_id"
  end

  create_table "schedule_tasks", force: :cascade do |t|
    t.string "name"
    t.time "start_time"
    t.time "end_time"
    t.bigint "schedule_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["schedule_id"], name: "index_schedule_tasks_on_schedule_id"
  end

  create_table "schedules", force: :cascade do |t|
    t.date "date"
    t.bigint "day_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["day_id"], name: "index_schedules_on_day_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.integer "status"
    t.time "start_time"
    t.bigint "pomodoro_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["pomodoro_id"], name: "index_sessions_on_pomodoro_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "water_trackers", force: :cascade do |t|
    t.integer "goal_amount", default: 2000
    t.integer "increment_amount", default: 250
    t.integer "frequency", default: 30
    t.integer "current_amount"
    t.integer "status"
    t.boolean "notification"
    t.bigint "day_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["day_id"], name: "index_water_trackers_on_day_id"
  end

  add_foreign_key "challenge_participants", "challenges"
  add_foreign_key "challenge_participants", "users"
  add_foreign_key "challenges", "users", column: "creator_id"
  add_foreign_key "challenges", "users", column: "winner_id"
  add_foreign_key "days", "users"
  add_foreign_key "list_items", "lists"
  add_foreign_key "lists", "users"
  add_foreign_key "pomodoros", "days"
  add_foreign_key "schedule_tasks", "schedules"
  add_foreign_key "schedules", "days"
  add_foreign_key "sessions", "pomodoros"
  add_foreign_key "water_trackers", "days"
end
