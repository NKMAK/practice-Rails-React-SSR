module JwtHelper
  extend ActiveSupport::Concern

  def generate_jwt(user)
    payload = {
      user_id: user.uuid,
      exp: 24.hours.from_now.to_i
    }
    JWT.encode(payload, 'sample_secret_key', 'HS256')
  end

  #try-catch入れたい

  def create_refresh_token(user)
    refresh_token_record = RefreshToken.create!(
      user_id: user.id,
      token: SecureRandom.hex(32),
      expires_at: 30.days.from_now
    )
    refresh_token_record 
  end

  def update_refresh_token(found_refresh_token)
    found_refresh_token.update!(
      token: SecureRandom.hex(32),
      expires_at: 30.days.from_now
    )
    found_refresh_token.reload
  end
end