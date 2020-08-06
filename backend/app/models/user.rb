class User < ApplicationRecord
  has_many :recipes

  has_secure_password :validations => false

  validates :username, :presence => true
  validates :username, uniqueness: { case_sensitive: false }
end