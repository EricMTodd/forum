include SecureRandom

class UsersController < ApplicationController

  def show
    user = User.find_by(id: params[:id])
    posts = user.posts

    if user
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

  def update
    user = User.find_by(id: params[:id])
    user.update(user_params)

    if user.save!
      render json: {
        message: 'User updated',
        user: user,
        successful: true
      }
    else
      render json: {
        message: 'Failed to update user!',
        user: {},
        successful: false
      }
    end
  end

  def destroy
    user = User.find_by(id: params[:id])
    puts('params: ', params)

    if user && user.authenticate(params[:password])
      if user.destroy!
        render json: {
          message: 'User destroyd.',
          successful: true
        }
      else
        render json: {
          message: 'Failed to destroy user!',
          successful: false
        }
      end
    else
      render json: {
        message: 'Failed to authenticate user!',
        successful: false
      }
    end

  end

  private

  def user_params
    params.require(:user).permit(:id, :handle, :email, :password, :password_confirmation)
  end

end