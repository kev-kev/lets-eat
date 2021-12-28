class CreateRecipeIngredientsJoinTable < ActiveRecord::Migration[6.0]
  def change
    create_join_table :recipes, :ingredients, table_name: :recipe_ingredients do |t|
      t.integer :count
    end
  end
end
