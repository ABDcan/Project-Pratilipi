const axios = require("axios");

const resolvers = {
  Query: {
    users: async () => {
      const { data } = await axios.get("http://localhost:3001/api/users");
      console.log(data)
      return data.map((user) => ({
        id: user._id, // Map MongoDB _id to id
        username: user.username,
        email: user.email,
      }));
    },
    user: async (_, { id }) => {
      const { data } = await axios.get(`http://localhost:3001/api/users/${id}`);
      return {
        id: data._id, // Map MongoDB _id to id
        username: data.username,
        email: data.email,
      };
    },
    products: async () => {
      const { data } = await axios.get("http://localhost:3002/api/products");
      return data.map((product) => ({
        id: product._id, // Map MongoDB _id to id
        name: product.name,
        price: product.price,
        inventory: product.inventory,
      }));
    },
    product: async (_, { id }) => {
      const { data } = await axios.get(
        `http://localhost:3002/api/products/${id}`
      );
      return {
        id: data._id, // Map MongoDB _id to id
        name: data.name,
        price: data.price,
        inventory: data.inventory,
      };
    },
    orders: async () => {
      const { data } = await axios.get("http://localhost:3003/api/orders");
      return data;
    },
    order: async (_, { id }) => {
      const { data } = await axios.get(
        `http://localhost:3003/api/orders/${id}`
      );
      return data;
    },
  },
  Mutation: {
    registerUser: async (_, { input }) => {
      const { data } = await axios.post(
        "http://localhost:3001/api/users/register",
        input
      );
      return {
        id: data.id,
        username: data.username,
        email: data.email,
        token: data.token,
      };
    },
    createProduct: async (_, { input }) => {
      const { data } = await axios.post(
        "http://localhost:3002/api/products",
        input
      );
      return {
        id: data.id,
        name: data.name,
        price: data.price,
        inventory: data.inventory,
      };
    },
    placeOrder: async (_, { input }) => {
      const { data } = await axios.post(
        "http://localhost:3003/api/orders",
        input
      );
      return data['order'];
    },
  },
};

module.exports = resolvers;
