class AddUpcomingToRecipe < ActiveRecord::Migration[6.0]
  def change
    add_column :recipes, :upcoming, :boolean, default: false
  end
end
