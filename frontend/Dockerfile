# ベースイメージとしてNode.jsを使用
FROM node:22-slim

# コンテナ内の作業ディレクトリを設定
WORKDIR /app

# パッケージファイルをコピー
COPY package.json package-lock.json ./

# 依存関係をインストール
RUN npm install

# 開発用サーバの起動
CMD ["npm", "run", "dev"]
