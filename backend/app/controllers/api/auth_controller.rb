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
    user = User.find_by(email: user_params[:email])
  
    if user&.authenticate(user_params[:password])# ユーザーが存在し、パスワードが一致する場合
      refresh_token = RefreshToken.find_by(user_id: user.id)
  
      if refresh_token
        # 既存トークンの更新
        refresh_token.update!(
          token: SecureRandom.hex(32),
          expires_at: 30.days.from_now
        )
      else
        # 新規トークンの作成
        refresh_token = RefreshToken.create!(
          user_id: user.id,
          token: SecureRandom.hex(32),
          expires_at: 30.days.from_now
        )
      end
  
      render json: {
        refresh_token: refresh_token.token,
        uuid: user.uuid
      }
    else
      render json: { error: 'Invalid credentials' }, status: :unauthorized
    end
  end

  def refresh_token
    token_params = params.require(:refresh_token).permit(:uuid, :token)
    render json: { received: token_params }
  end
end
