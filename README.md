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

## Deploy

Deploy to minikube

```
# Start minikube
$ minikube start

# Use local image
$ eval $(minikube docker-env)

# Build docker image
$ docker build -t ms-website .

# Deploy
$ kubectl apply -f deploy/deployment.yaml
$ kubectl apply -f deploy/service.yaml
$ kubectl apply -f deploy/ingress.yaml

# Get all status
$ kubectl get all | grep "ms-website"

# Access to deployed app (Click the displayed url)
$ minikube service ms-website --url
```

Enable Ingress

```
# Enable the Ingress controller
$ minikube addons enable ingress

# Run this command after installation
$ minikube tunnel

# setup host
$ sudo vi /etc/hosts
$ grep "ms-tv.local" /etc/hosts
127.0.0.1 ms-tv.local

# access
$ curl -i -v http://ms-tv.local
```

minikube common commands

```
$ minikube start
$ minikube status
$ minikube dashboard
$ minikube tunnel
$ minikube stop
```
