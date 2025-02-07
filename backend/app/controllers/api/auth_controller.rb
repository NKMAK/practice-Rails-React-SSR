class Api::AuthController < ApplicationController
  def signup
    user_params = params.require(:user).permit(:username, :email, :password)
    user = User.new(user_params)  
    if user.save
      render json: { uuid: user.uuid }  # 成功時とりあえずUUIDを返す
    else
      render json: { errors: user.errors }, status: :unprocessable_entity 
    end
  end

  def login
    user_params = params.require(:user).permit(:email, :password)
    render json: { received: user_params } 
  end

  def refresh_token
    token_params = params.require(:refresh_token).permit(:uuid, :token)
    render json: { received: token_params }
  end
end
