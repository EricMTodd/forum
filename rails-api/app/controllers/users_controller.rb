class UsersController < ApplicationController

  def create
    user = User.create(user_params)

    if user.save
      render json: {
        message: 'User created',
        user: user
      }
    else
      render json: {
        message: 'Failed to create user!',
        user: {}
      }
    end
  end

  private

  def user_params
    params.require(:user).permit(:handle, :email, :password, :password_confirmation)
  end

end