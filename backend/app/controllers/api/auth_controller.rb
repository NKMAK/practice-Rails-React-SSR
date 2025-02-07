class Api::AuthController < ApplicationController
  def signup
    user_params = params.require(:user).permit(:username, :email, :password)
    render json: { received: user_params } # 受け取ったデータを確認
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
