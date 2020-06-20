class UsersController < ApplicationController
  def signup
    @user = User.create(user_params)
    if @user.valid?
      token = encode_token({user_id: @user.id})
      render json: {user: @user, token: token}
    else
      render json: {error: 'uWu oh no! your username or password is invalid 🥺👉👈'}
    end
  end

  def login
    @user = User.find_by(username: params[:username])
    if @user && @user.authenticate(params[:password])
      token = encode_token({user_id: @user.id})
      render json: {user: @user, token: token}
    else
      render json: {error: 'uWu oh no! your username or password is invalid 🥺👉👈'}
    end
  end

  private
    def user_params
      params.permit(:username, :password)
    end
end
