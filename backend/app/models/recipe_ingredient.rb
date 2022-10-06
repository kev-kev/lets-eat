class RecipeIngredient < ApplicationRecord
  belongs_to :recipe
  belongs_to :ingredient

  validates :count, numericality: {greater_than_or_equal_to: 1}, allow_blank: true
  validates :recipe_id, :ingredient_id, presence: true
end
