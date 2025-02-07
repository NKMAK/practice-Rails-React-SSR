class User < ApplicationRecord
  has_secure_password  # パスワードの暗号化と認証機能
  validates :email, presence: true, uniqueness: true  # メールアドレスのバリデーション
end