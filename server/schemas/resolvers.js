const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('Please log in.')
        },
    },
    
    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            return user;
        }
    }
}