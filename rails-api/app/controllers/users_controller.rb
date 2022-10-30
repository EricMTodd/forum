include SecureRandom

class UsersController < ApplicationController

  def show
    user = User.find_by(id: params[:id])

    if user
      render json: {
        message: 'User retrieved.',
        user: user
      }
    else
      render json: {
        message: 'Failed to retrieve user!',
        user: user
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
        user: user
      }
    else
      render json: {
        message: 'Failed to create user!',
        logged_in: false,
        user: {}
      }
    end
  end

  private

  def user_params
    params.require(:user).permit(:handle, :email, :password, :password_confirmation)
  end

end