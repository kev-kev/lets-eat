class HomeController < ApplicationController
  def get_grocery_list
    weekly_recipes = Recipe.where("'#{Date.parse(params[:week])}' = ANY (weeks)")
    weekly_recipe_ingredients = []
    weekly_recipes.each do |recipe|
      RecipeIngredient.where(recipe_id: recipe.id)
        .each do |recipe_ingredient| 
          weekly_recipe_ingredients << recipe_ingredient 
        end
    end
    weekly_ingredients = []
    weekly_recipe_ingredients.each do |recipe_ingredient|
      ingredient = Ingredient.find(recipe_ingredient.ingredient_id)
      weekly_ingredients << {
        count: recipe_ingredient[:count],
        unit: ingredient[:unit],
        name: ingredient[:name]
      }
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

  def get_ingredients_by_recipe
    ingredients = Recipe.find(params[:recipe_id]).ingredients
    render json: {
      ingredients: ingredients
    }
  end

end