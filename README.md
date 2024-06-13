
# E-commerce API

This project is a NestJS-based e-commerce API that follows Domain-Driven Design (DDD) principles. It uses MongoDB for data storage and JWT for authentication. The API provides endpoints to manage products and orders.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **Docker** (v20 or higher)
- **Docker Compose** (v1.28 or higher)

## Setting Up the Project

### Clone the Repository

```bash
git clone https://github.com/dansant1/ecommerce-api
cd ecommerce-api
```

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```
MONGO_URI=mongodb://mongodb:27017/ecommerce
JWT_SECRET=your_jwt_secret_key
```

### Running the Application with Docker

Build and start the containers:

```bash
docker-compose up --build
```

This will start the MongoDB and the NestJS application. The API will be available at `http://localhost:3000`.

## API Endpoints

### Authentication

#### Register User
```
POST /api/v1/auth/signup
```
**Input:**
```json
{
  "username": "user",
  "password": "password"
}
```

**Output:**
```json
{
  "message": "user registered"
}
```

#### Login
```
POST /api/v1/auth/login
```
**Input:**
```json
{
  "username": "user",
  "password": "password"
}
```

**Output:**
```json
{
  "access_token": "jwt_token_here"
}
```

### Products

#### Create a Product
```
POST /api/v1/products
```
**Input:**
```json
{
  "name": "Product Name",
  "sku": "SKU001",
  "price": 100,
  "picture": "path/to/picture.jpg"
}
```

**Output:**
```json
{
  "id": "product_id",
  "name": "Product Name",
  "sku": {
    "value": "SKU001"
  }, 
  "price": 100,
  "picture": "path/to/picture.jpg"
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/v1/products \
-H "Content-Type: application/json" \
-d '{
  "name": "Product Name",
  "sku": "SKU001",
  "price": 100,
  "picture": "path/to/picture.jpg"
}'
```

#### Get a Product by SKU
```
GET /api/v1/products/:sku
```

**Output:**
```json
{
  "id": "product_id",
  "name": "Product Name",
  "sku": {
    "value": "SKU001"
  },
  "price": 100,
  "picture": "path/to/picture.jpg"
}
```

**Example:**
```bash
curl -X GET http://localhost:3000/api/v1/products/SKU001
```

### Orders

#### Create an Order
```
POST /api/v1/orders
```
**Input:**
```json
{
  "clientName": "Client Name",
  "total": 200,
  "productList": ["product_id_1", "product_id_2"]
}
```

**Output:**
```json
{
  "_id": "order_id",
  "clientName": "Client Name",
  "total": 200,
  "productList": ["product_id_1", "product_id_2"]
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/v1/orders \
-H "Content-Type: application/json" \
-d '{
  "clientName": "Client Name",
  "total": 200,
  "productList": ["product_id_1", "product_id_2"]
}'
```

#### Update an Order
```
PUT /api/v1/orders/:id
```
**Input:**
```json
{
  "clientName": "Updated Client Name",
  "total": 300,
  "productList": ["updated_product_id_1", "updated_product_id_2"]
}
```

**Output:**
```json
{
  "id": "order_id",
  "clientName": "Updated Client Name",
  "total": 300,
  "productList": ["updated_product_id_1", "updated_product_id_2"]
}
```

**Example:**
```bash
curl -X PUT http://localhost:3000/api/v1/orders/order_id \
-H "Content-Type: application/json" \
-d '{
  "clientName": "Updated Client Name",
  "total": 300,
  "productList": ["updated_product_id_1", "updated_product_id_2"]
}'
```

#### Get Total Sold Price in the Last Month
```
GET /api/v1/orders/total-sold-price-last-month
```

**Output:**
```json
{
  "total": 1000
}
```

**Example:**
```bash
curl -X GET http://localhost:3000/api/v1/orders/total-sold-price-last-month
```

#### Get the Highest Amount Order
```
GET /api/v1/orders/highest-amount-order
```

**Output:**
```json
{
  "id": "order_id",
  "clientName": "Client Name",
  "total": 500,
  "productList": ["product_id_1", "product_id_2"]
}
```

**Example:**
```bash
curl -X GET http://localhost:3000/api/v1/orders/highest-amount-order
```

# Cleaning
to finish the containers, networks and volumens generated by the docker compose

```bash
docker-compose down -v
```

## License

This project is licensed under the MIT License.

