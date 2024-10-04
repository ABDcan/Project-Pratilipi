require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schemas/schema");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs, // Your GraphQL schema
  resolvers, // Your resolvers
  formatError: (err) => {
    console.error(err); // Log the full error for debugging
    return {
      message: err.message,
      path: err.path,
      code: err.extensions.code,
    }; // Customize the error response to exclude circular structures
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
