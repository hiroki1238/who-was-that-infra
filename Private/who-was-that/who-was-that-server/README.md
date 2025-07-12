# Who Was That - Backend

Go + Echo + AWS Lambda を使用したバックエンド API

## 🚀 開発を始める時のコマンド

### 初回セットアップ（一度だけ実行）

```bash
# 1. プロジェクトディレクトリに移動
cd /Users/taba/Private/who-was-that-server

# 2. Go依存関係をダウンロード
go mod download

# 3. 環境変数ファイルを作成
cp .env.example .env.local
# または手動で .env.local を作成して必要な環境変数を設定

# 4. Goバージョンを確認（1.24.0が必要）
go version

# 5. データベースとRedisをDocker Composeで起動
docker-compose up -d db redis

# 6. データベースの初期化（初回のみ）
# PostgreSQLが起動するまで少し待ってから実行
docker-compose exec db psql -U postgres -c "CREATE DATABASE IF NOT EXISTS who_was_that_db;"
```

### 開発サーバーの起動

```bash
# プロジェクトディレクトリに移動
cd /Users/taba/Private/who-was-that-server

# 開発サーバーを起動（ホットリロード有効）
go run main.go

# またはDocker Composeで全体を起動
docker-compose up --build
```

**💡 サーバーは http://localhost:8080 で起動します**

### API 動作確認

```bash
# ヘルスチェック
curl http://localhost:8080/health

# レスポンス例: {"message": "Server is running"}
```

### その他の開発コマンド

```bash
# テストの実行
go test ./...

# モジュールの整理
go mod tidy

# データベースとRedisの停止
docker-compose down

# データベースのリセット（データが削除されます）
docker-compose down -v
docker-compose up -d db redis
```

## 技術スタック

- **フレームワーク**: Echo v4
- **言語**: Go 1.24
- **データベース**: PostgreSQL
- **キャッシュ**: Redis
- **認証**: AWS Cognito
- **デプロイ**: AWS Lambda + API Gateway
- **インフラ**: Terraform

## 開発環境セットアップ

### 前提条件

- Go 1.24
- Docker & Docker Compose
- AWS CLI (デプロイ用)

### 環境変数の設定

`.env.local` ファイルを作成し、以下の環境変数を設定してください：

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=who_was_that_db
DB_SSL_MODE=disable

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# AWS Cognito Configuration
COGNITO_USER_POOL_ID=
COGNITO_CLIENT_ID=
COGNITO_IDENTITY_POOL_ID=
AWS_REGION=ap-northeast-1

# Server Configuration
SERVER_PORT=8080
JWT_SECRET=your-jwt-secret-here

# AWS Lambda Environment (leave empty for local development)
AWS_LAMBDA_FUNCTION_NAME=
```

### 開発サーバーの起動

1. 依存関係をダウンロード：

```bash
go mod download
```

2. Docker Compose でデータベースと Redis を起動：

```bash
docker-compose up -d db redis
```

3. 開発サーバーを起動：

```bash
go run main.go
```

または、Docker Compose で全体を起動：

```bash
docker-compose up --build
```

### エンドポイント

- **ヘルスチェック**: `GET /health`
- **認証**:
  - `POST /auth/login` - ログイン
  - `POST /auth/register` - ユーザー登録
  - `POST /auth/refresh` - トークンリフレッシュ
  - `POST /auth/logout` - ログアウト
- **API** (認証必要):
  - `GET /api/users/profile` - プロフィール取得
  - `PUT /api/users/profile` - プロフィール更新
  - `DELETE /api/users/profile` - プロフィール削除

### プロジェクト構成

```
.
├── main.go                 # エントリーポイント
├── internal/
│   ├── config/            # 設定管理
│   ├── handlers/          # HTTPハンドラー
│   ├── services/          # ビジネスロジック
│   ├── repository/        # データアクセス層
│   └── models/            # データモデル
├── docker-compose.yml     # 開発環境用
├── Dockerfile.dev         # 開発用Dockerfile
├── .air.toml              # ホットリロード設定
└── README.md
```

## デプロイ

### AWS Lambda 用ビルド

```bash
GOOS=linux GOARCH=amd64 go build -o main main.go
zip backend.zip main
```

### Terraform でインフラ構築

```bash
cd ../who-was-that-infra
terraform init
terraform plan
terraform apply
```

## 開発ガイド

### ホットリロード

開発時は `air` を使用してホットリロードが有効になります。

### データベースマイグレーション

初回セットアップ時は `scripts/init.sql` を実行してテーブルを作成してください。

### テスト

```bash
go test ./...
```

## 環境

- **開発**: `http://localhost:8080`
- **本番**: AWS Lambda + API Gateway
