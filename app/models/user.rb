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
  has_many :created_challenges, class_name: 'Challenge', foreign_key: 'creator_id'
  has_many :won_challenges, class_name: 'Challenge', foreign_key: 'winner_id'
  has_many :challenge_participants
  has_many :participating_challenges, through: :challenge_participants, source: :challenge
end
