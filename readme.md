This project consists of three microservices for User, Product, and Order management, with a GraphQL gateway to interact with all of them. The services communicate using RabbitMQ for event-driven architecture, and MongoDB is used for persistent storage.

## Microservices

1. **User Service**: Manages user registration, login, and user data.
2. **Product Service**: Handles product creation, inventory updates, and listing.
3. **Order Service**: Processes customer orders and maintains order data.
4. **GraphQL Gateway**: Provides a unified interface for querying and managing users, products, and orders.

### Technology Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Event Bus**: RabbitMQ
- **API Gateway**: Apollo GraphQL
- **Containerization**: Docker, Docker Compose

## Setup Instructions

### Prerequisites

- Node.js and npm installed on your system.
- Docker installed on your system to pull the RabbitMQ image.
- MongoDB service set up and running.

### Step-by-Step Setup

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd Project-Pratilipi
   ```

2. **Environment Variables**

   Create a `.env` file in the root folder containing the following variables:

   ```bash
   MONGO_URI=mongodb://user-mongo-db:27017/userDB
   JWT_SECRET=your_secret_key
   RABBITMQ_URL=amqp://localhost
   ```

3. **Run the RabbitMQ Container**

   Pull the RabbitMQ image and run it using Docker:

   ```bash
   docker pull rabbitmq:management
   docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management
   ```

   This command will run RabbitMQ with the management plugin, accessible via the web UI at `http://localhost:15672/` (default username and password are both `guest`).

4. **Install Dependencies and Start the Application**

   Install the necessary Node.js packages and start the services:

   ```bash
   npm install
   npm start
   ```

   This command will:

   - Build and run the User, Product, Order, and GraphQL services.
   - Set up MongoDB instances for each service.

5. **Access the Application**

   - **GraphQL Gateway**: Access the GraphQL playground at `http://localhost:4000/`.
   - **User Service**: Available at `http://localhost:3001/api/users`.
   - **Product Service**: Available at `http://localhost:3002/api/products`.
   - **Order Service**: Available at `http://localhost:3003/api/orders`.

## Services Overview

### User Service

Manages user registration, login, and retrieving user details. JWT is used for authentication.

#### Routes:

- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: User login.
- `GET /api/users`: Retrieve all users.
- `GET /api/users/:id`: Retrieve a user by ID.

### Product Service

Handles product management including creation, inventory updates, and product listings.

#### Routes:

- `POST /api/products`: Create a new product.
- `PUT /api/products/:id`: Update inventory for a product.
- `GET /api/products`: List all products.
- `GET /api/products/:id`: Get product details by ID.

### Order Service

Manages customer orders and provides order history.

#### Routes:

- `POST /api/orders`: Create a new order.
- `GET /api/orders`: Get all orders.
- `GET /api/orders/:id`: Get order details by ID.

### GraphQL Gateway

Provides a single endpoint to interact with all services using GraphQL.

#### Example Queries:

- **Get all users**:

  ```graphql
  query {
    users {
      id
      username
      email
    }
  }
  ```

- **Place an Order**:

  ```graphql
  mutation {
    placeOrder(
      input: {
        userId: "user-id"
        products: [{ productId: "product-id", quantity: 2 }]
      }
    ) {
      id
      userId
      products {
        productId
        quantity
      }
    }
  }
  ```
