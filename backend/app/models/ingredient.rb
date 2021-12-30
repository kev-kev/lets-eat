class Ingredient < ApplicationRecord
  has_many :recipe_ingredient
  has_many :recipes, through: :recipe_ingredient

  validates :name, :unit, presence: true
end