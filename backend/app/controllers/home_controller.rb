require 'pry'

class HomeController < ApplicationController
  def get_grocery_list
    weekly_recipes = Recipe.where("'#{Date.parse(params[:week])}' = ANY (weeks)")
    weekly_ingredients = []
    weekly_recipes.each do |recipe|
      get_ingredients_by_recipe_id(weekly_ingredients, recipe.id)
    end
    grocery_list = {}
    weekly_ingredients.each do |weekly_ingredient|
      if grocery_list[weekly_ingredient[:name]]
        ingredient_counts_units = grocery_list[weekly_ingredient[:name]]
        ingredient_counts_units.each do |counts_unit| 
          if counts_unit[:unit] == weekly_ingredient[:unit]
            counts_unit[:count] += weekly_ingredient[:count]
          else
            grocery_list[weekly_ingredient[:name]] << {count: weekly_ingredient[:count], unit: weekly_ingredient[:unit]}
          end
        end
      else
        grocery_list[weekly_ingredient[:name]] = [{count: weekly_ingredient[:count], unit: weekly_ingredient[:unit]}]
      end
    end
    render json: {
      groceryList: grocery_list
    }
  end

  def get_ingredients_by_recipe_id(ingredients_arr, recipe_id)
    recipe_ingredients = RecipeIngredient.where(recipe_id: recipe_id)
    recipe_ingredients.each do |recipe_ingredient|
      ing = Ingredient.find(recipe_ingredient.ingredient_id)
      ingredients_arr << {
        count: recipe_ingredient[:count],
        unit: ing[:unit],
        name: ing[:name]
      }
    end
    ingredients_arr
  end

end