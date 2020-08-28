class Recipe < ApplicationRecord
  belongs_to :user
  # validates :link, presence: true
  # validates :name, presence: true
  after_initialize :set_defaults

  enum status: [:pending, :approved, :rejected]



  def set_defaults
    default_recipe_imgs = [
      "https://lets-eat-imgs.s3.amazonaws.com/recipe_1.jpg",
      "https://lets-eat-imgs.s3.amazonaws.com/recipe_2.png",
      "https://lets-eat-imgs.s3.amazonaws.com/recipe_3.jpeg",
      "https://lets-eat-imgs.s3.amazonaws.com/recipe_4.jpeg",
      "https://lets-eat-imgs.s3.amazonaws.com/recipe_5.jpeg",
    ]

    self.status ||= 0
    self.is_favorited ||= false
    if !self.img_url || self.img_url == "" || self.img_url == " "
      self.img_url = default_recipe_imgs.sample
    end
  end
end
