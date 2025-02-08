module JwtHelper
  extend ActiveSupport::Concern

  def generate_jwt(user)
    payload = {
      user_id: user.uuid,
      exp: 24.hours.from_now.to_i
    }
    JWT.encode(payload, 'sample_secret_key', 'HS256')
  end
end