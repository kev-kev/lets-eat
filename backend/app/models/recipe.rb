class Recipe < ApplicationRecord
  belongs_to :user
  
  # validates :link, presence: true
  # validates :name, presence: true

  after_initialize :set_defaults

  enum status: [:pending, :approved, :rejected]

  def set_defaults
    self.status ||= 0
    self.is_favorited ||= false
  end
end
