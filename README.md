# MS Website

## 開発準備

```
# App初期設定
$ make init
```

以下の環境変数を設定してください。

```
AUTH0_SECRET=
AUTH0_BASE_URL=
AUTH0_ISSUER_BASE_URL=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
AUTH0_SCOPE='openid profile read:videos'
AUTH0_AUDIENCE=
```

## 実行コマンド

```
# 実行
$ make run

# Dockerビルド
$ make docker-build

# Docker実行
$ make docker-run

# external appsを立ち上げる
$ make external-run

# external appsを終了する
$ make external-end

# ヘルプ
$ make help
```
