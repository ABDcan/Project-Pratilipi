const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    inventory: Int!
  }

  type Order {
    id: ID!
    userId: String!
    products: [OrderProduct!]!
  }

  type OrderProduct {
    productId: String!
    quantity: Int!
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
  }

  input ProductInput {
    name: String!
    price: Float!
    inventory: Int!
  }

  input OrderInput {
    userId: String!
    products: [OrderProductInput!]!
  }

  input OrderProductInput {
    productId: String!
    quantity: Int!
  }

  type Query {
    users: [User]
    user(id: ID!): User
    products: [Product]
    product(id: ID!): Product
    orders: [Order]
    order(id: ID!): Order
  }

  type Mutation {
    registerUser(input: RegisterInput): User
    createProduct(input: ProductInput): Product
    placeOrder(input: OrderInput): Order
  }
`;

module.exports = typeDefs;
