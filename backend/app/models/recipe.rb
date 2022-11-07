class Recipe < ApplicationRecord
  belongs_to :user
  has_many :recipe_ingredient
  has_many :ingredients, through: :recipe_ingredient

  validates :name, presence: true
  validate :can_only_be_favorited_if_approved

  def can_only_be_favorited_if_approved
    if is_favorited && status != "approved"
        errors[:favorited] << "Can only be favorited if recipe is approved."
    end
  end

  enum status: [:pending, :approved, :rejected]
end
