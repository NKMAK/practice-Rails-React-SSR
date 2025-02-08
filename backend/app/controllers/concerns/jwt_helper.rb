module JwtHelper
  extend ActiveSupport::Concern

  def generate_jwt(user)
    payload = {
      user_id: user.uuid,
      exp: 24.hours.from_now.to_i
    }
    JWT.encode(payload, Rails.application.credentials.jwt_secret)
  end
end