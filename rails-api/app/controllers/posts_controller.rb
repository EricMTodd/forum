class PostsController < ApplicationController

  def index
    posts = Post.all

    if posts
      render json: {
        message: 'Retrieved posts.',
        posts: posts,
        successful: true
      }
    else
      render json: {
        message: 'Failed to retrieve posts!',
        posts: {},
        successful: false
      }
    end
  end

  def show
    post = Post.find_by(id: params[:id])

    if post
      render json: {
        message: 'Post retrieved.',
        post: post,
        successful: true
      }
    else
      render json: {
        message: 'Failed to retrieve post!',
        post: {},
        successful: false
      }
    end
  end

  def create
    post = Post.new(post_params)

    if post.save!
      render json: {
        message: 'Post created.',
        post: post,
        successful: true
      }
    else
      render json: {
        message: 'Failed to create post!',
        post: {},
        successful: false
      }
    end
  end

  private

  def post_params
    params.require(:post).permit(:user_handle, :user_id, :title, :body)
  end

end