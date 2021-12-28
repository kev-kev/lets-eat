class RecipesController < ApplicationController
  def index
    week = request.query_parameters[:week]
    recipes = Recipe.order(:id).map{|recipe| format_recipe(recipe)}
    render json: {
      recipes: recipes
    }
  end

  def submit
   # p 'the ingredients are....................................'
    # recipe_params[:ingredients].split("\n").each{|ingredient| p ingredient.split(", ")}
    @recipe = Recipe.new(recipe_params.except(:ingredients))
    @user = User.find(recipe_params[:user_id])
    @recipe.user = @user
    if @recipe.valid?
      ingredients = recipe_params[:ingredients].split("\n")
      @recipe.save!
      ingredients.each do |ingredient|
        name, count, unit = ingredient.split(", ")
        ingredient = Ingredient.find_or_create_by({"name"=> name, "unit" => unit})
        if ingredient.valid?
          ingredient.save!
          recipe_ingredient = RecipeIngredient.new({"recipe_id"=> @recipe.id, "ingredient_id"=> ingredient.id, "count"=>count})
          recipe_ingredient.save!
        end
      end
      render json: {recipe: @recipe}, status: 200
    else
      render json: {error: 'uh oh! your recipe is invalid 🥺👉👈'}, status: 400
    end
  end

  def update
    @recipe = Recipe.find(params[:id])
    if @recipe
      @recipe.update(recipe_params)
      render status: 200
    else
      render json: {error: "unable to update recipe"}, status: 400
    end
  end

  def destroy
    if Recipe.destroy(params[:id])
      render json: {recipes: Recipe.order(:created_at).map{ |recipe| format_recipe(recipe) }}, status: 200
    else
      render json: { error: 'unabme to delete recipe'}, status: 400
    end
  end

  private
    def recipe_params
      params.require(:recipe).permit(:id, :name, :link, :status, :notes, :user_id, :img_url, :is_favorited, :ingredients, {weeks: []})
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
        ingredients: recipe.ingredients,
        weeks: recipe.weeks.map(&:iso8601)
      }
    end
end