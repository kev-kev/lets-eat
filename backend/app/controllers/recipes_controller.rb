require 'pry'
class RecipesController < ApplicationController
  def index
    recipes = Recipe.order(:id).map{|recipe| format_recipe(recipe)}
    render json: {
      recipes: recipes
    }
  end

  def submit
    recipe = Recipe.new(recipe_params.except(:ingredients))
    user = User.find(recipe_params[:user_id])
    recipe.user = user
    if recipe.valid?
      ingredients = recipe_params[:ingredients]
      recipe.save!
      ingredients.each do |ingredient|
        new_ingredient = Ingredient.find_or_create_by({"name"=> ingredient[:name], "unit" => ingredient[:unit]})
        if new_ingredient.valid?
          recipe_ingredient = RecipeIngredient.find_or_create_by({"recipe_id"=> recipe[:id], "ingredient_id"=> new_ingredient[:id], "count"=>ingredient[:count]})
        else
          render json: {error: 'uh oh! your ingredients are invalid 🥺👉👈'}, status: 400
        end
      end
      render status: 200
    else
      render json: {error: 'uh oh! your recipe is invalid 🥺👉👈'}, status: 400
    end
  end

  def update
    recipe = Recipe.find(params[:id])
    if recipe
        update_recipe_ingredients(recipe, recipe_params[:ingredients])
        if recipe.update(recipe_params.except(:ingredients))
          render status: 200
        else
          render json: {error: "unable to update recipe"}, status: 400
        end
    else
      render json: {error: "unable to update recipe, recipe could not be found"}, status: 400
    end
  end

  def destroy
    if Recipe.destroy(params[:id])
      render json: {recipes: Recipe.order(:created_at).map{ |recipe| format_recipe(recipe) }}, status: 200
    else
      render json: { error: 'unable to delete recipe'}, status: 400
    end
  end

  private
    def recipe_params
      params.require(:recipe).permit(:id, :name, :link, :status, :notes, :user_id, :img_url, :is_favorited, {ingredients: [:name, :count, :unit]}, {weeks: []})
    end

    def format_recipe(recipe)
      {
        submittedBy: recipe.user.username,
        name: recipe.name,
        status: recipe.status,
        notes: recipe.notes,
        id: recipe.id,
        imgUrl: recipe.img_url,
        link: recipe.link,
        isFavorited: recipe.is_favorited,
        weeks: recipe.weeks.map(&:iso8601),
        ingredients: recipe.ingredients.map{|ingredient| format_ingredient(ingredient, recipe.id)}
      }
    end

    def format_ingredient(ingredient, recipe_id)
      {
        name: ingredient.name,
        unit: ingredient.unit,
        count: RecipeIngredient.where(
          ingredient_id: ingredient.id,
          recipe_id: recipe_id
        ).count
      }
    end

    def update_recipe_ingredients(recipe, new_ingredients)
      old_ingredients = RecipeIngredient.where({"recipe_id" => recipe[:id]})
      remove_ingredients(new_ingredients, old_ingredients)
      add_ingredients(new_ingredients, old_ingredients, recipe[:id])
    end

    def remove_ingredients(new_ingredients, old_ingredients)
      old_ingredients.each do |old_ingredient|
        unless new_ingredients.includes(old_ingredient)
          old_ingredient.destroy!
        end
      end
    end

    def add_ingredients(new_ingredients, old_ingredients, recipe_id)
      new_ingredients.each do |ingredient|
        unless old_ingredients.includes(ingredient)
          new_ingredient = Ingredient.find_or_create_by({"name"=> ingredient[:name], "unit" => ingredient[:unit]})
          if new_ingredient.valid?
            recipe_ingredient = RecipeIngredient.find_or_create_by({
              "recipe_id"=> recipe_id,
              "ingredient_id"=> new_ingredient[:id],
              "count"=>new_ingredient[:count]
            })
          end
        end
      end
    end

end