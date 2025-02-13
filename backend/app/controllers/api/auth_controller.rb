class Api::AuthController < ApplicationController
  skip_before_action :authenticate_jwt  # 認証をスキップ

  include JwtHelper
  
  def signup
    user_params = params.require(:user).permit(:username, :email, :password)
    user = User.new(user_params)  

    if user.save
      jwt = generate_jwt(user)
      refresh_token  = create_refresh_token(user)
      render json: {
        token: jwt,  
        refresh_token: refresh_token.token,
        uuid: user.uuid
      }
    else
      render json: { errors: user.errors }, status: :unprocessable_entity 
    end
  end

  def login
    user_params = params.require(:user).permit(:email, :password)
    user = User.find_by(email: user_params[:email])
  
    if user&.authenticate(user_params[:password])# ユーザーが存在し、パスワードが一致する場合
      found_refresh_token  = RefreshToken.find_by(user_id: user.id)
      jwt = generate_jwt(user)
      refresh_token  = found_refresh_token ? update_refresh_token(found_refresh_token) : create_refresh_token(user)
  
      render json: {
        token: jwt,  
        refresh_token: found_refresh_token.token,
        uuid: user.uuid
      }
    else
      render json: { error: 'Invalid credentials' }, status: :unauthorized
    end
  end

  def refresh_token
    token_params = params.require(:refresh_token).permit(:uuid, :token)
    user = User.find_by(uuid: token_params[:uuid])

    return render json: { error: 'User not found' }, status: :not_found unless user
  
    # トークンと有効期限の検証
    refresh_token = RefreshToken.find_by(
      user_id: user.id,
      token: token_params[:token],
      expires_at: Time.current..
    )
  
    if refresh_token
      # 新しいJWTトークン生成
      jwt = generate_jwt(user)
      update_refresh_token(refresh_token)
      render json: { token: jwt }
    else
      render json: { error: 'Invalid token' }, status: :unauthorized
    end
  end
end
