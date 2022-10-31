class PostsController < ApplicationController

  def create
    post = Post.new(post_params)

    if post.save!
      render json: {
        message: 'Post created.',
        post: post
      }
    else
      render json: {
        message: 'Failed to create post!',
        post: {}
      }
    end
  end

  private

  def post_params
    params.require(:post).permit(:author_id, :title, :body)
  end

end