class Api::PostsController < ApplicationController
    skip_before_action :authenticate_jwt  # 認証をスキップ

    
    def create
      post = Post.new(post_params)
      
      if post.save
        render json: post, status: :created
      else
        render json: { errors: post.errors }, status: :unprocessable_entity
      end
    end

    def index
      base_posts = Post.order(created_at: :desc).limit(10)
      result_posts = base_posts
    
      # 複製数のパラメータ処理を追加
      duplicate_count = if params[:duplicate].present?
        [params[:duplicate].to_i, 1].max # 最小値を1に設定
      else
        1 # デフォルト値
      end
    
      # テストモードの場合は遅延処理
      if params[:test].present? && params[:test] == 'true'
        sleep(2)
      end
    
      # 複製数が2以上の場合は複製処理
      if duplicate_count > 1
        result_posts = base_posts.take(1).map do |post|
          duplicate_count.times.map do |i|
            post.attributes.merge(
              'id' => "#{post.id+i}"
            )
          end
        end.flatten
      end
    
      render json: result_posts
    end

    private

    def post_params
      params.require(:post).permit(:title, :content)
    end
end
