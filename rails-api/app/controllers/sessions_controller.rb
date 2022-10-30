class SessionsController < ApplicationController
  def logged_in
    if session[:user_id]
      user = User.find_by(id: session[:user_id])

      render json: {
        message: "#{user.handle} is logged in.",
        logged_in: true,
        user: user
      }
    else
      render json: {
        message: 'No user logged in.',
        logged_in: false,
        user: {}
      }
    end
  end

  def create
    user = User.find_by(email: params[:email])

    if user && user.authenticate(params[:password])
      session[:user_id] = user.id

      render json: {
        message: 'Logged in.',
        logged_in: true,
        user: user
      }
    else
      render json: {
        message: 'Failed to log in.',
        logged_in: false,
        user: {}
      }
    end
  end
end