# Who Was That - Client

Next.js + TypeScript + AWS Amplify を使用したフロントエンドアプリケーション

## 🚀 技術スタック

### コア技術

- **フレームワーク**: Next.js 15.3.5 (App Router + Turbopack)
- **言語**: TypeScript 5
- **UIライブラリ**: React 19.0.0
- **状態管理**: Redux Toolkit 2.8.2
- **スタイリング**: Tailwind CSS 4
- **認証**: AWS Amplify 6.15.3 (AWS Cognito)
- **ビルドツール**: Turbopack (開発時)

### 開発・テストツール

- **コンポーネント開発**: Storybook 8.6.14
- **テスト**: Jest 30.0.4 + React Testing Library 16.3.0
- **リンター**: ESLint 9 + Next.js ESLint Config
- **フォーマッター**: Prettier 3.6.2
- **スタイル**: Stylelint 16.21.1
- **Git フック**: Husky 9.1.7 + lint-staged 16.1.2
- **コード生成**: Hygen 6.2.11

## 🔧 開発環境セットアップ

### 前提条件

- Node.js 18.18.0 以上
- npm または yarn
- AWS CLI (デプロイ用)

### 初回セットアップ

1. **リポジトリのクローン**

   ```bash
   git clone git@github.com:hiroki1238/who-was-that-client.git
   cd who-was-that-client
   ```

2. **依存関係のインストール**

   ```bash
   npm install
   ```

3. **環境変数の設定**

   ```bash
   cp .env.example .env.local
   # 必要に応じて環境変数を編集
   ```

4. **Node.jsバージョンを確認**
   ```bash
   node --version  # 18.18.0以上が必要
   ```

### 🚀 開発サーバーの起動

```bash
# Turbopackを使用した高速開発サーバー
npm run dev

# ブラウザで http://localhost:3000 を開く
```

### 🌐 アクセス先

| サービス     | URL                   | 説明                     |
| ------------ | --------------------- | ------------------------ |
| 開発サーバー | http://localhost:3000 | メインアプリケーション   |
| Storybook    | http://localhost:6006 | コンポーネントライブラリ |

## 📁 プロジェクト構成

```
.
├── .cursorrules            # Cursor エディタ設定
├── .gitignore              # Git 除外設定
├── .tool-versions          # Node.js バージョン管理
├── CLAUDE.md               # Claude AI 開発ガイド
├── eslint.config.mjs       # ESLint 設定
├── next.config.ts          # Next.js 設定
├── package.json            # 依存関係とスクリプト
├── postcss.config.mjs      # PostCSS 設定
├── tsconfig.json           # TypeScript 設定
├── README.md               # このファイル
├── public/                 # 静的ファイル
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
└── src/                    # ソースコード
    ├── app/                # Next.js App Router
    │   ├── globals.css     # グローバルスタイル
    │   ├── layout.tsx      # ルートレイアウト
    │   └── page.tsx        # ホームページ
    └── lib/                # ライブラリ設定
        └── aws-config.ts   # AWS Amplify 設定
```

## 🛠️ 開発コマンド

### 基本コマンド

```bash
# 開発サーバー起動（Turbopack使用）
npm run dev

# 本番用ビルド
npm run build

# 本番サーバー起動（ビルド後）
npm run start

# ESLint によるコードチェック
npm run lint
```

### 品質管理

```bash
# 全てのファイルをフォーマット
npx prettier . --write

# TypeScript 型チェック
npx tsc --noEmit

# スタイルリント
npx stylelint "**/*.css"
```

## 🧪 テスト

### テストコマンド

```bash
# 単体テスト実行
npm run test

# テストをウォッチモードで実行
npm run test:watch

# カバレッジレポート生成
npm run test:coverage
```

### テスト戦略

- **単体テスト**: Jest + React Testing Library
- **コンポーネントテスト**: Storybook での視覚的テスト
- **統合テスト**: ユーザーフローのテスト
- **アクセシビリティテスト**: React Testing Library での a11y テスト

## 🎨 Storybook

### Storybook の起動

```bash
npm run storybook
```

### コンポーネントの作成

```bash
# Hygen を使用してコンポーネントを生成
npx hygen component new ButtonComponent
```

## 🔐 環境変数

### 必要な環境変数

```env
# AWS Cognito Configuration
NEXT_PUBLIC_COGNITO_USER_POOL_ID=your-user-pool-id
NEXT_PUBLIC_COGNITO_CLIENT_ID=your-client-id
NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID=your-identity-pool-id
NEXT_PUBLIC_AWS_REGION=ap-northeast-1

# API Configuration
NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:8080

# Environment
NODE_ENV=development
```

## 🚀 デプロイメント

### AWS S3 + CloudFront

1. **ビルド**

   ```bash
   npm run build
   ```

2. **デプロイ**
   ```bash
   # terraform または AWS CLI を使用
   # 詳細は who-was-that-infra リポジトリを参照
   ```

### Vercel (代替案)

```bash
npm install -g vercel
vercel --prod
```

## 🎯 主要機能

### 認証システム

- **ログイン**: AWS Cognito を使用したメール認証
- **ユーザー登録**: メールアドレスとパスワードによる新規登録
- **パスワードリセット**: メールによるパスワードリセット
- **プロフィール管理**: ユーザー情報の表示・編集
- **セッション管理**: 自動ログイン・ログアウト

### UI/UX

- **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応
- **ダークモード**: ライト・ダークテーマ切り替え
- **アクセシビリティ**: WCAG準拠のアクセシブルなUI
- **パフォーマンス**: Next.js Image 最適化、Code Splitting

## 🔧 開発ガイド

### コンポーネント開発

1. **コンポーネントの作成**

   ```bash
   # Hygen を使用してコンポーネントを生成
   npx hygen component new MyComponent
   ```

2. **Storybook での確認**

   ```bash
   npm run storybook
   ```

3. **テストの作成**
   ```bash
   # Jest + React Testing Library でテスト
   npm run test
   ```

### 状態管理

Redux Toolkit を使用してアプリケーションの状態を管理：

```typescript
// store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
  } as AuthState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});
```

### スタイリング

Tailwind CSS 4 を使用してスタイリングを行います：

```tsx
// components/Button/Button.tsx
interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
}) => {
  const baseClasses = "font-medium rounded-md transition-colors";
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
  };
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {children}
    </button>
  );
};
```

## 🤝 開発ガイドライン

- `.cursorrules` ファイルに従ってコーディングを行う
- `CLAUDE.md` を参照してClaude AIとの協働を行う
- TypeScript の型安全性を活用する
- React のベストプラクティスに従う
- アクセシビリティを考慮したUI開発
- パフォーマンスを意識したコード作成

## 📚 関連リポジトリ

- **バックエンド**: [who-was-that-server](https://github.com/hiroki1238/who-was-that-server)
- **インフラ**: [who-was-that-infra](https://github.com/hiroki1238/who-was-that-infra)

## 🐛 トラブルシューティング

### よくある問題

1. **開発サーバーが起動しない**

   ```bash
   # Node.js のバージョンを確認
   node --version

   # 依存関係を再インストール
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **ビルドエラーが発生する**

   ```bash
   # TypeScript の型チェック
   npx tsc --noEmit

   # ESLint でコードチェック
   npm run lint
   ```

3. **AWS Amplify の認証が動作しない**

   ```bash
   # 環境変数を確認
   echo $NEXT_PUBLIC_COGNITO_USER_POOL_ID

   # AWS 設定を確認
   aws configure list
   ```

## 📊 パフォーマンス最適化

### Core Web Vitals の改善

- Next.js Image コンポーネントの使用
- コードスプリッティング
- 動的インポート
- バンドルサイズの最適化

### 監視

```bash
# バンドルサイズの分析
npm run build
npx @next/bundle-analyzer
```

## 📝 ライセンス

MIT License

## 👥 貢献

プルリクエストやイシューの作成を歓迎します。

### 貢献手順

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成
