# Who Was That - Infrastructure

Terraform を使用した AWS インフラ構築

## 🚀 開発を始める時のコマンド

### 初回セットアップ（一度だけ実行）

```bash
# 1. プロジェクトディレクトリに移動
cd /Users/taba/Private/who-was-that-infra

# 2. AWS認証情報を設定
aws configure
# または環境変数を設定:
# export AWS_ACCESS_KEY_ID=your_access_key
# export AWS_SECRET_ACCESS_KEY=your_secret_key
# export AWS_DEFAULT_REGION=ap-northeast-1

# 3. Terraformを初期化
terraform init

# 4. 変数ファイルを作成（オプション）
cp terraform.tfvars.example terraform.tfvars
# または手動で terraform.tfvars を作成して必要な変数を設定
```

### インフラの構築

```bash
# プロジェクトディレクトリに移動
cd /Users/taba/Private/who-was-that-infra

# 1. 実行プランを確認
terraform plan

# 2. インフラを作成
terraform apply

# 3. 作成されたリソースの確認
terraform show

# 4. 重要な出力値を確認（環境変数として使用）
terraform output
```

**💡 出力された値はフロントエンドとバックエンドの環境変数として使用してください**

### 開発環境の管理

```bash
# 開発環境のワークスペースを作成
terraform workspace new dev
terraform workspace select dev

# 本番環境のワークスペースを作成
terraform workspace new prod
terraform workspace select prod

# 現在のワークスペースを確認
terraform workspace show
```

### その他の管理コマンド

```bash
# リソースの状態を確認
terraform state list

# 特定のリソースを確認
terraform state show aws_cognito_user_pool.main

# リソースの削除（⚠️ 注意: 全てのリソースが削除されます）
terraform destroy

# 設定ファイルの構文チェック
terraform validate
```

## 技術スタック

- **IaC**: Terraform
- **クラウドプラットフォーム**: AWS
- **主要サービス**:
  - AWS Cognito (認証)
  - AWS Lambda (バックエンド)
  - API Gateway (API 管理)
  - S3 + CloudFront (フロントエンド)
  - RDS for PostgreSQL (データベース)
  - ElastiCache for Redis (キャッシュ)
  - VPC (ネットワーク)

## 前提条件

- Terraform 1.0+
- AWS CLI
- AWS 認証情報の設定

## AWS 認証情報の設定

```bash
aws configure
```

または、環境変数を設定：

```bash
export AWS_ACCESS_KEY_ID=your_access_key
export AWS_SECRET_ACCESS_KEY=your_secret_key
export AWS_DEFAULT_REGION=ap-northeast-1
```

## インフラ構築

### 1. Terraform の初期化

```bash
terraform init
```

### 2. プランの確認

```bash
terraform plan
```

### 3. インフラの作成

```bash
terraform apply
```

### 4. 作成されたリソースの確認

```bash
terraform show
```

### 5. 重要な出力値の確認

```bash
terraform output
```

## 変数の設定

`terraform.tfvars` ファイルを作成して、必要な変数を設定できます：

```hcl
# terraform.tfvars
project_name = "who-was-that"
aws_region   = "ap-northeast-1"
db_password  = "your_secure_password_here"
```

## 作成されるリソース

### 認証

- **Cognito User Pool**: ユーザー認証
- **Cognito User Pool Client**: アプリケーションクライアント
- **Cognito Identity Pool**: ID 連携

### フロントエンド

- **S3 Bucket**: 静的ウェブサイトホスティング
- **CloudFront Distribution**: CDN 配信
- **CloudFront OAI**: S3 アクセス制御

### バックエンド

- **Lambda Function**: API 処理
- **API Gateway**: RESTful API 管理
- **IAM Role**: Lambda 実行ロール

### データベース・キャッシュ

- **RDS PostgreSQL**: メインデータベース
- **ElastiCache Redis**: キャッシュサーバー

### ネットワーク

- **VPC**: プライベートネットワーク
- **Public/Private Subnets**: サブネット分離
- **Internet Gateway**: インターネット接続
- **Security Groups**: セキュリティルール

## 出力値

デプロイ完了後、以下の重要な値が出力されます：

- `cognito_user_pool_id`: Cognito User Pool ID
- `cognito_user_pool_client_id`: Cognito Client ID
- `cognito_identity_pool_id`: Cognito Identity Pool ID
- `api_gateway_url`: API Gateway エンドポイント
- `cloudfront_domain_name`: CloudFront ドメイン名
- `s3_bucket_name`: S3 バケット名

これらの値は、フロントエンドとバックエンドの環境変数として使用してください。

## 環境別設定

### 開発環境

```bash
terraform workspace new dev
terraform workspace select dev
terraform apply -var-file="dev.tfvars"
```

### 本番環境

```bash
terraform workspace new prod
terraform workspace select prod
terraform apply -var-file="prod.tfvars"
```

## セキュリティベストプラクティス

### 1. データベースパスワード

本番環境では、データベースパスワードを安全に管理してください：

```bash
export TF_VAR_db_password="your_secure_password"
terraform apply
```

### 2. State 管理

本番環境では、Terraform の state ファイルを S3 バックエンドで管理することを推奨します：

```hcl
# backend.tf
terraform {
  backend "s3" {
    bucket = "your-terraform-state-bucket"
    key    = "who-was-that/terraform.tfstate"
    region = "ap-northeast-1"
  }
}
```

### 3. アクセス制御

最小権限の原則に従い、必要最小限の IAM ポリシーを設定してください。

## コスト最適化

### 開発環境のコスト削減

- RDS: `db.t3.micro` (無料枠対象)
- ElastiCache: `cache.t3.micro` (無料枠対象)
- Lambda: 無料枠内で十分
- S3: 無料枠内で十分

### 本番環境のコスト管理

- CloudWatch でリソース使用量を監視
- Auto Scaling でリソースを動的調整
- Reserved Instances で長期利用コストを削減

## 監視・ログ

### CloudWatch

- Lambda Function のメトリクス
- API Gateway のアクセスログ
- RDS パフォーマンスメトリクス

### ログの確認

```bash
aws logs describe-log-groups
aws logs tail /aws/lambda/who-was-that-backend --follow
```

## トラブルシューティング

### よくある問題

1. **AWS 認証エラー**

   - AWS CLI の認証情報を確認
   - 適切な IAM ポリシーが設定されているか確認

2. **Lambda デプロイエラー**

   - backend.zip ファイルが存在するか確認
   - Lambda 関数のサイズ制限を確認

3. **データベース接続エラー**
   - セキュリティグループの設定を確認
   - VPC とサブネットの設定を確認

### デバッグ

```bash
# 詳細ログを有効にする
export TF_LOG=DEBUG
terraform apply
```

## リソースの削除

**⚠️ 注意**: 以下のコマンドは全てのリソースを削除します

```bash
terraform destroy
```

## 変更履歴

- v1.0.0: 初期リリース
- v1.1.0: Redis 追加
- v1.2.0: CloudFront 設定最適化

## 貢献

インフラの改善提案やバグ報告は、GitHub の Issue または Pull Request でお願いします。

## ライセンス

MIT License
