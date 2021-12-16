class RecipesController < ApplicationController
  RECIPES_PER_PAGE = 20
  def index
    page = request.query_parameters[:page]
    page = 0 if page === "undefined"
    render json: {recipes: Recipe.order(:created_at).offset(page * RECIPES_PER_PAGE).limit(RECIPES_PER_PAGE).map{ |recipe| format_recipe(recipe)}}
  end

  def submit
    @recipe = Recipe.new(recipe_params)
    @user = User.find(recipe_params[:user_id])
    @recipe.user = @user
    if @recipe.valid?
      @recipe.save!
      render json: {recipe: @recipe}
    else
      render json: {error: 'uh oh! your recipe is invalid 🥺👉👈'}
    end
  end

  def update
    @recipe = Recipe.find(params[:id])
    @recipe.update(recipe_params)
    # render json: {recipe: format_recipe(@recipe)}
    self.index
  end

  def destroy
    Recipe.destroy(params[:id])
    render json: {recipes: Recipe.order(:created_at).map{ |recipe| format_recipe(recipe) }}
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