class CreateRecipesIngredientsJoinTable < ActiveRecord::Migration[6.0]
  def change
    create_join_table :recipes, :ingredients  do |t|
      t.index :recipe_id
      t.index :ingredient_id
      t.integer :count
    end
  end
end
