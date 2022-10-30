include SecureRandom

class UsersController < ApplicationController

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