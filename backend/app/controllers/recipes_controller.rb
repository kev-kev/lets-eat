class RecipesController < ApplicationController
  RECIPES_PER_PAGE = 20
  WEEKLY_RECIPES_PER_PAGE = 4
  def index
    page = request.query_parameters[:page];
    page = 1 if page === "undefined"
    week = request.query_parameters[:week];
    render json: {
      weeklyRecipes: Recipe.where("'#{Date.parse(week)}' = ANY (weeks)").order(:id).offset((page.to_i-1) * RECIPES_PER_PAGE).limit(RECIPES_PER_PAGE).map{ |recipe| format_recipe(recipe)},
      nonWeeklyRecipes: Recipe.where("cardinality(weeks) = 0").map{|recipe| format_recipe(recipe)}
      # recipes: Recipe.order(:id).offset((page-1) * RECIPES_PER_PAGE).limit(RECIPES_PER_PAGE).map{ |recipe| format_recipe(recipe)}
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
      page = request.query_parameters[:page]
      page = 0 if page === "undefined"
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