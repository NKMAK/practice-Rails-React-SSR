class Api::PostsController < ActionController


    def create
      post = Post.new(post_params)
      
      if post.save
        render json: post, status: :created
      else
        render json: { errors: post.errors }, status: :unprocessable_entity
      end
    end

    def index
      posts = Post.order(created_at: :desc).limit(10)
      render json: posts
    end

    private

    def post_params
      params.require(:post).permit(:title, :content)
    end
end
