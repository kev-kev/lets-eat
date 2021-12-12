class RemoveUpcomingFromRecipes < ActiveRecord::Migration[6.0]
  def change
    remove_column :recipes, :upcoming
  end
end
