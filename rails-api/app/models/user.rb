class User < ApplicationRecord
  has_secure_password
  validates :handle, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  has_many :posts
  has_many :comments
end
