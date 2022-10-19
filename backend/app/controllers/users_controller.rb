require 'pry'
class UsersController < ApplicationController
  def create
    @user = User.create(user_params)
    if @user.valid?
      token = encode_token({user_id: @user.id})
      render json: {user: @user, token: token}
    else
      render json: {error: 'Something went wrong! Please try again.'}, status: 400
    end
  end

  def login
    @user = User.find_by(username: user_params[:username])
    if @user && @user.authenticate(user_params[:password])
      token = encode_token({user_id: @user.id})
      render json: {user: @user, token: token}, status: :accepted
    else
      render json: {error: 'Username or password is invalid.'}, status: 401
    end
  end

  private
    def user_params
      params.require(:user).permit(:username, :password)
    end
end 
