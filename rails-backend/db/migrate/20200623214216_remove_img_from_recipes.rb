class RemoveImgFromRecipes < ActiveRecord::Migration[6.0]
  def change
    remove_column :recipes, :img_url
  end
end
