class SessionsController < ApplicationController
  def logged_in
    puts('params: ', params)
    user = User.find_by(persistence_token: params[:persistence_token])

    if user
      render json: {
        message: 'User retrieved.',
        logged_in: true,
        user: user
      }
    else
      render json: {
        message: 'Failed to retrieve user!',
        logged_in: false,
        user: {}
      }
    end
  end

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