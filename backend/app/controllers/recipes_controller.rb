class RecipesController < ApplicationController
  def index
    week = request.query_parameters[:week]
    recipes = Recipe.order(:id).map{|recipe| format_recipe(recipe)}
    render json: {
      recipes: recipes
    }
  end

  def submit
    @recipe = Recipe.new(recipe_params)
    @user = User.find(recipe_params[:user_id])
    @recipe.user = @user
    if @recipe.valid?
      @recipe.save!
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
      params.require(:recipe).permit(:name, :link, :status, :notes, :user_id, :img_url, :is_favorited, :ingredients, {weeks: []})
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