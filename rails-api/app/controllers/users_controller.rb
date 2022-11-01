include SecureRandom

class UsersController < ApplicationController

  def show
    user = User.find_by(id: params[:id])
    posts = user.posts

    if user && posts
      render json: {
        message: 'User retrieved.',
        user: user,
        posts: posts,
        successful: true
      }
    else
      render json: {
        message: 'Failed to retrieve user!',
        user: {},
        posts: {},
        successful: false
      }
    end
  end

  def create
    user = User.new(user_params)
    user.persistence_token = SecureRandom.alphanumeric(32)
    
    if user.save!
      render json: {
        message: 'User created.',
        logged_in: true,
        user: user,
        successful: true
      }
    else
      render json: {
        message: 'Failed to create user!',
        logged_in: false,
        user: {},
        successful: false
      }
    end
  end

  private

  def user_params
    params.require(:user).permit(:handle, :email, :password, :password_confirmation)
  end

end