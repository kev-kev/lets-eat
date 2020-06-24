class RecipesController < ApplicationController
  def index
    @recipes = Recipe.all
    render json: {recipes: @recipes}
  end

  def submit
    # find user from the user id then 
    @recipe = Recipe.new(recipe_params)
    @user = User.find(recipe_params[:user_id])
    @recipe.user = @user
    if @recipe.valid?
      @recipe.save!
      render json: {recipes: Recipe.all}
    else
      render json: {error: 'oWo uh oh! your recipe is invalid 🥺👉👈'}
    end
  end

  def change_status
    @recipe = Recipe.find(recipe_params[:id])
    @recipe.update(status: recipe_params[:status])
    render json: {recipes: Recipe.all}
  end

  def destroy
    Recipe.destroy(recipe_params[:id])
    render json: {recipes: Recipe.all}
  end

  private
    def recipe_params
      params.require(:recipe).permit(:name, :link, :status, :notes, :user_id, :id, :img_url)
    end
end