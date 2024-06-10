class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :days
  has_many :lists

  has_many :schedules, through: :days
  has_many :water_trackers, through: :days
  has_many :pomodoros, through: :days
end
