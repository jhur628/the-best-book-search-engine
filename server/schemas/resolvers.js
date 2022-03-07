const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne(
                    [{ _id: user ? user._id : params.id } || { username: params.username }]
                );
            }
            throw new AuthenticationError('Please log in.')
        },
    },

    Mutation: {
        addUser: async (parent, {username, email, password}) => {
            const user  = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },

        login: async (parent, {username, email, password}) => {
            const user = await User.findOne({email} || {username});
            
            if (!user) {
                throw new AuthenticationError('No user with that email or username')
            };

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password.')
            };

            const token = signToken(user);
            return { token, user }
        },

        saveBook: async (parent, { userId, book }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: userId },
                    {
                        $addToSet: { savedBooks: book }
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            throw new AuthenticationError('You must be logged in to save a book.');
        },

        deleteBook: async (parent, { book }, context) => {
            if (!context.user) {
                return User.findOneAndDelete(
                    { _id: context.user._id },
                    {
                        $pull: { savedBooks: book }
                    },
                    { new: true }
                );
            }
            throw new AuthenticationError('You must be logged in to delete a saved book.')
        }
    }
};

module.exports = resolvers;