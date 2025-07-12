# Who Was That - Frontend

Next.js + TypeScript + AWS Cognito を使用したフロントエンドアプリケーション

## 🚀 開発を始める時のコマンド

### 初回セットアップ（一度だけ実行）

```bash
# 1. プロジェクトディレクトリに移動
cd /Users/taba/Private/who-was-that-client

# 2. 依存関係をインストール
npm install

# 3. 環境変数ファイルを作成
cp .env.example .env.local
# または手動で .env.local を作成して必要な環境変数を設定

# 4. Node.jsバージョンを確認（20.5.0以上が必要）
node --version
```

### 開発サーバーの起動

```bash
# プロジェクトディレクトリに移動
cd /Users/taba/Private/who-was-that-client

# 開発サーバーを起動
npm run dev
```

**💡 ブラウザで http://localhost:3000 を開いてアプリケーションを確認できます**

### その他の開発コマンド

```bash
# Storybookの起動（コンポーネントの確認）
npm run storybook

# テストの実行
npm run test

# ESLintによるコードチェック
npm run lint

# 本番用ビルド
npm run build
```

## 技術スタック

- **フレームワーク**: Next.js 15.1.7 (App Router)
- **言語**: TypeScript 5
- **UIライブラリ**: React 19.0.0
- **状態管理**: Redux Toolkit 2.5.1
- **スタイリング**: CSS Modules + Tailwind CSS
- **認証**: AWS Cognito (AWS Amplify)
- **デプロイ**: AWS S3 + CloudFront
- **開発ツール**: Storybook, Jest, ESLint, Prettier

## 開発環境セットアップ

### 前提条件

- Node.js 18.18.0 以上
- npm または yarn
- AWS CLI (デプロイ用)

### インストール

```bash
npm install
```

### 環境変数の設定

`.env.local` ファイルを作成し、以下の環境変数を設定してください：

```env
# AWS Cognito Configuration
NEXT_PUBLIC_COGNITO_USER_POOL_ID=
NEXT_PUBLIC_COGNITO_CLIENT_ID=
NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID=
NEXT_PUBLIC_AWS_REGION=ap-northeast-1

# API Configuration
NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:8080
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## 利用可能なスクリプト

### 開発

```bash
npm run dev          # 開発サーバー起動
npm run build        # 本番用ビルド
npm run start        # 本番サーバー起動
npm run lint         # ESLint実行
npm run test         # テスト実行
npm run storybook    # Storybook起動
```

### デプロイ

```bash
npm run build        # 本番用ビルド
npm run deploy       # AWS S3へデプロイ
```

## プロジェクト構成

```
.
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # グローバルスタイル
│   │   ├── layout.tsx          # ルートレイアウト
│   │   └── page.tsx            # ホームページ
│   ├── components/             # 再利用可能コンポーネント
│   ├── lib/                    # ライブラリ設定
│   │   └── aws-config.ts       # AWS Amplify設定
│   ├── store/                  # Redux状態管理
│   ├── hooks/                  # カスタムフック
│   ├── types/                  # TypeScript型定義
│   └── utils/                  # ユーティリティ関数
├── public/                     # 静的ファイル
├── stories/                    # Storybook
├── __tests__/                  # テストファイル
├── .storybook/                 # Storybook設定
├── next.config.ts              # Next.js設定
├── tailwind.config.ts          # Tailwind CSS設定
├── tsconfig.json               # TypeScript設定
└── README.md
```

## 主要機能

### 認証

- **ログイン**: AWS Cognitoを使用したメール認証
- **ユーザー登録**: メールアドレスとパスワードによる新規登録
- **パスワードリセット**: メールによるパスワードリセット
- **プロフィール管理**: ユーザー情報の表示・編集

### UI/UX

- **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応
- **ダークモード**: ライト・ダークテーマ切り替え
- **アクセシビリティ**: WCAG準拠のアクセシブルなUI

## 開発ガイド

### コンポーネント開発

1. `src/components/` にコンポーネントを作成
2. CSS Modulesを使用してスタイリング
3. Storybookでコンポーネントの動作確認
4. Jestでテストを作成

### 状態管理

Redux Toolkitを使用してアプリケーションの状態を管理：

```typescript
// store/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    // reducers here
  },
});
```

### スタイリング

CSS Modulesを使用してコンポーネントのスタイリングを行います：

```css
/* components/Button/Button.module.css */
.button {
  @apply px-4 py-2 rounded-md font-medium;
}

.primary {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}
```

## テスト

### 単体テスト

```bash
npm run test
```

### コンポーネントテスト

```bash
npm run test:components
```

### E2Eテスト

```bash
npm run test:e2e
```

## デプロイ

### AWS S3 + CloudFront

1. Terraformでインフラ構築：

```bash
cd ../who-was-that-infra
terraform apply
```

2. ビルドとデプロイ：

```bash
npm run build
npm run deploy
```

### Vercel (代替案)

```bash
npm install -g vercel
vercel --prod
```

## 環境

- **開発**: `http://localhost:3000`
- **Storybook**: `http://localhost:6006`
- **本番**: CloudFront配信URL

## 貢献

プルリクエストやイシューの作成は歓迎します。

## ライセンス

MIT License
