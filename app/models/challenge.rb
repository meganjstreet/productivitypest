class Challenge < ApplicationRecord
  belongs_to :creator, class_name: 'User', foreign_key: 'creator_id'
  belongs_to :winner, class_name: 'User', optional: true
  has_many :challenge_participants
  has_many :participants, through: :challenge_participants, source: :user

  accepts_nested_attributes_for :challenge_participants, allow_destroy: true
end
