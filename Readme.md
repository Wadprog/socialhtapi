# Community Social Media Platform API

This repository contains the API for a community-focused social media platform. The platform allows users to create and manage multiple communities with varying types (public, private, hidden) and assign different user roles. The architecture follows a microservices pattern deployed on Kubernetes.

---

## Features

- **Community Management**: Create, update, and manage communities with different types.
- **User Roles**: Assign and manage roles for community members.
- **Private, Public, and Hidden Communities**: Control access and visibility.
- **User Interactions**: Support for posts, comments, likes, and notifications.
- **Authentication and Authorization**: Secure access via JWT and role-based permissions.
- **Geographic Data**: Address and location management for users and communities.

---

## Project Structure

```plaintext
.
├── infra
│   ├── k8s                # Kubernetes configurations for production and development
│   ├── k8s-dev            # Development-specific configurations
│   └── k8s-prod           # Production-specific configurations
├── services
│   ├── auth               # Authentication microservice
│   ├── post               # Community and post management microservice
│   ├── address            # Geographic and address-related microservice
│   └── mailer             # Email notifications microservice
├── LICENSE                # License information
└── README.md              # Project documentation

```
## Microservices

### 1. Authentication Service
- Handles user authentication and role-based authorization.
- Implements secure token management with JWT.
- Path: **services/auth**
### 2. Post Service
- Manages communities, posts, comments, and interactions.
- Supports various community types (public, private, hidden).
- Path: **services/post**
### 3. Address Service
- Provides location management features.
- Supports country, state, and city-level details.
- Path: **services/address**
### 4. Mailer Service
- Sends email notifications for events like community invites, new posts, etc.
- Path: **services/mailer**
## Deployment

The project is deployed on Kubernetes with the following configurations:

- **Development**: infra/k8s-dev
- **Production**: infra/k8s-prod
- **Ingress**: Managed via infra/k8s/ingress-srv.yaml
### Quick Start
1. Install kubectl and Minikube.
2. Deploy the microservices:
```sh
kubectl apply -f infra/k8s/
kubectl apply -f infra/ # chose dev or production
```
3. Access the platform via the ingress service.
### Technology Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Messaging**: NATS
- **Containerization**: Docker
- **Orchestration**: Kubernetes
### Getting Started

#### Prerequisites
- Docker and Docker Compose
- Node.js and npm
- Kubernetes CLI tools (kubectl, Minikube)
#### Installation
1. Clone the repository:
```sh
git clone <repository-url>
```
2. Install dependencies for all services:
```sh
skaffold dev
```
3. Contributing

Contributions are welcome! Please read the CONTRIBUTING.md for guidelines.

#### License

This project is licensed under the MIT License.