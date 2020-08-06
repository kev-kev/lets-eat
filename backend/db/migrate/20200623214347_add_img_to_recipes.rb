class AddImgToRecipes < ActiveRecord::Migration[6.0]
  def change
    add_column :recipes, :img_url, :string
  end
end
