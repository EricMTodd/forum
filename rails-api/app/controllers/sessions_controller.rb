class SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])

    if user && user.authenticate(params[:password])
      render json: {
        message: "#{user.handle} logged in.",
        logged_in: true,
        user: user
      }
    else
      render json: {
        message: 'Failed to log in!',
        logged_in: false,
        user: {}
      }
    end
  end
end