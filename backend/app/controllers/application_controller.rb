class ApplicationController < ActionController::API
  before_action :authenticate_jwt  # 全てのアクションの前に認証を実行
  private 
  
  def authenticate_jwt
    header = request.headers['Authorization']  # ヘッダーからトークンを取得
    if header
      token = header.split(' ').last  # "Bearer xxxxx" から "xxxxx" 部分を取得
      begin
        decoded = JWT.decode(
          token,                    # 検証するトークン
          'sample_secret_key',    # 署名用の秘密鍵 本来は環境変数で隠す
          true,                     # 署名検証を有効化
          { algorithm: 'HS256' }    # 暗号化アルゴリズム
        )
        # トークンからユーザーを特定 このフォルダ配下のコントローラーで@current_userを使えるようにする
        @current_user = User.find_by(uuid: decoded[0]['user_id'])
      rescue JWT::DecodeError
        render json: { error: 'Invalid token' }, status: :forbidden
      end
    else
      render json: { error: 'No token provided' }, status: :forbidden
    end
  end

  # 認証をスキップしたいコントローラーで使用
  def skip_jwt_authentication
    skip_before_action :authenticate_jwt
  end
end
