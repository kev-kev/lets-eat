class Recipe < ApplicationRecord
  belongs_to :user
  has_many :recipe_ingredient
  has_many :ingredients, through: :recipe_ingredient

  validates :link, presence: true
  validates :name, presence: true
  validate :can_only_be_favorited_if_approved

  def can_only_be_favorited_if_approved
    if is_favorited && status != "approved"
        errors[:favorited] << "Can only be favorited if recipe is approved."
    end
  end

  enum status: [:pending, :approved, :rejected]
  
  after_initialize :set_defaults
  def set_defaults
    default_recipe_imgs = [
      "https://lets-eat-imgs.s3.amazonaws.com/recipe_1.jpg",
      "https://lets-eat-imgs.s3.amazonaws.com/recipe_2.png",
      "https://lets-eat-imgs.s3.amazonaws.com/recipe_3.jpeg",
      "https://lets-eat-imgs.s3.amazonaws.com/recipe_4.jpeg",
      "https://lets-eat-imgs.s3.amazonaws.com/recipe_5.jpeg",
    ]
    
    if !self.img_url || self.img_url == "" || self.img_url == " "
      self.img_url = default_recipe_imgs.sample
    end
  end
end
