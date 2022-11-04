class Comment < ApplicationRecord
  validates :body, presence: true
  belongs_to :post
  belongs_to :comment
  has_many :comments, dependent: :destroy
end
