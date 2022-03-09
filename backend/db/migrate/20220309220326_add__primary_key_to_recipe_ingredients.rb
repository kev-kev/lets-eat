class AddPrimaryKeyToRecipeIngredients < ActiveRecord::Migration[6.0]
  def change
    add_column :recipe_ingredients, :id, :primary_key
  end
end
