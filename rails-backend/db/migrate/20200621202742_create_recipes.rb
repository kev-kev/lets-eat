class CreateRecipes < ActiveRecord::Migration[6.0]
  def change
    create_table :recipes do |t|
      t.string :name
      t.string :link
      t.string :notes
      t.integer :status
      t.boolean :is_favorited

      t.timestamps
    end
  end
end
