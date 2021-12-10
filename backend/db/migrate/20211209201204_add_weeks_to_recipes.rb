class AddWeeksToRecipes < ActiveRecord::Migration[6.0]
  def change
    add_column :recipes, :weeks, :date, :array => true, :default => []
  end
end
