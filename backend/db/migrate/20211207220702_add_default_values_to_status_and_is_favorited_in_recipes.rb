class AddDefaultValuesToStatusAndIsFavoritedInRecipes < ActiveRecord::Migration[6.0]
  def change
    change_column_default :recipes, :is_favorited, false
    change_column_default :recipes, :status, 0
  end
end
