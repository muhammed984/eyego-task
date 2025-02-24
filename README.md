## Overview
This project demonstrates a complete DevOps workflow for deploying a simple Node.js web application to AWS EKS using Kubernetes. It includes Dockerization, CI/CD automation, and documentation for migrating to GKE.

## Features
- **Node.js API** that returns `Hello Eyego`
- **Dockerized application**
- **Kubernetes deployment** on AWS EKS with at least 2 replicas
- **LoadBalancer exposure**
- **CI/CD automation** using GitHub Actions
- **Migration documentation** for Google Cloud GKE

## Prerequisites
- AWS account with EKS setup
- GitHub repository
- Docker installed
- Kubernetes CLI (kubectl) installed
## Setup & Deployment

### 1. Clone the Repository
```bash
 git clone https://github.com/muhammed984/eyego-task.git
 cd eyego-task

```
### 2. Build and Run Locally
```bash
docker build -t eyego-app .
docker run -p 8080:8080 eyego-app
```

### 3. Push Docker Image to AWS ECR
```bash
eval $(aws ecr get-login --no-include-email --region us-east-1)
docker tag eyego-app:latest 559050208895.dkr.ecr.us-east-1.amazonaws.com/eyego-app
docker push 559050208895.dkr.ecr.us-east-1.amazonaws.com/eyego-app
```
### 4. Deploy to AWS EKS
```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```
Check the LoadBalancer URL:
```bash
kubectl get svc
```

### 5. CI/CD Pipeline (GitHub Actions)
- Push code to GitHub → Triggers CI/CD pipeline
- Automates building, testing, and deployment

### 6. Migration to GKE
Refer to [MIGRATION.md](MIGRATION.md) for step-by-step instructions.

## Repository Structure
```
├── app/               # Node.js application
├── k8s/               # Kubernetes manifests
├── .github/workflows/ # GitHub Actions CI/CD pipeline
├── Dockerfile         # Docker build configuration
├── README.md          # Project documentation
├── MIGRATION.md       # Steps for migrating to GKE
```

## Contributors
- Muhammed984

## License
MIT License
