This document outlines the steps required to migrate an application from AWS EKS to Google Kubernetes Engine (GKE).

## **1. Setup Google Kubernetes Engine (GKE)**
### **1.1 Enable GKE on Google Cloud**
1. Log in to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project.
3. Enable the **Kubernetes Engine API** by navigating to **Kubernetes Engine** → **Enable API**.

### **1.2 Create a GKE Cluster**

 $ gcloud container clusters create eyego-gke-cluster --num-nodes=2 --region us-east1


### **1.3 Configure kubectl for GKE**
Ensure that `gcloud` CLI is installed and authenticated:

 $ gcloud init
 $ gcloud auth login
 $ gcloud container clusters get-credentials eyego-gke-cluster --region us-east1




## **2. Migrate the Application to GKE**
### **2.1 Setup Google Container Registry (GCR)**

1. Enable **Container Registry API** in Google Cloud Console.
2. Authenticate Docker with GCR:
 
  $ gcloud auth configure-docker
   

### **2.2 Build and Push Docker Image to GCR**

  $ docker build -t gcr.io/your-project-id/eyego-app .
  $ docker push gcr.io/your-project-id/eyego-app


### **2.3 Update Kubernetes Deployment for GKE**
Modify `deployment.yaml` to reference the GCR image:
---
 containers:
   - name: my-node-app
     image: gcr.io/your-project-id/my-node-app:latest

Apply the updated deployment:

  $ kubectl apply -f deployment.yaml

---

## **3. Update CI/CD Pipeline for GKE**
### **3.1 Modify GitHub Actions Workflow**
Update .github/workflows/deploy.yml with GKE authentication and deployment steps:
---
name: Deploy to GKE

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Authenticate with GCP
        uses: google-github-actions/auth@v1
        with:
          credentials_json: ${{ secrets.GCP_CREDENTIALS }}

      - name: Set up GKE cluster
        run: |
          gcloud container clusters get-credentials eyego-gke-cluster --region us-east1

      - name: Build and Push Docker Image
        run: |
          docker build -t gcr.io/your-project-id/eyego-app .
          docker push gcr.io/your-project-id/eyego-app

      - name: Deploy to GKE
        run: |
          kubectl apply -f deployment.yaml


## **4. Verify Deployment**
Check the status of the pods and services:
  $ kubectl get pods
  $ kubectl get svc

Get the external IP of the application:

 kubectl get svc my-node-service







