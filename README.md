# MS Website

## Prerequisites

```
# Initialize app
$ make init
```

Set environments

```
AUTH0_SECRET=
AUTH0_BASE_URL=
AUTH0_ISSUER_BASE_URL=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
AUTH0_SCOPE='openid profile read:videos'
AUTH0_AUDIENCE=

WEB_API_URL=
STREAM_API_URL=
```

## How to develop

```
# Run on local
$ make run

# Build on docker
$ make docker-build

# Run on docker
$ make docker-run

# Run external apps
$ make external-run

# End external apps
$ make external-end

# Help
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
$ kubectl apply -f deploy/configmap.yaml
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

# Setup host
$ sudo vi /etc/hosts
$ grep "ms-tv.local" /etc/hosts
127.0.0.1 ms-tv.local

# Access
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
