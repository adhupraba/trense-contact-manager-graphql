const userResolver = require("./userResolver");
const contactResolver = require("./contactResolver");

const resolver = {
    Query: {
        ...contactResolver.Query
    },
    Mutation: {
        ...contactResolver.Mutation,
        ...userResolver.Mutation
    }
}

module.exports = resolver