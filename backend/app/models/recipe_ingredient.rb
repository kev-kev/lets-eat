class RecipeIngredient < ApplicationRecord
  belongs_to :recipe
  belongs_to :ingredient

  validates :count, numericality: {greater_than: 0}, presence: true
  validates :recipe_id, :ingredient_id, presence: true
end
