const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]!
}

type Book {
    bookId: String!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
}

type Auth {
    _id: ID!
    user: User
}

type Query {
    me: User
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, email: String!, password: String!): Auth
    saveBook(input: savedBook): User
    deleteBook(bookId: ID!): User
}

input savedBook {
    authors: [String]
    description: String
    bookId: String!
    image: String
    link: String
    title: String!
}
`

//Input types: https://www.apollographql.com/docs/apollo-server/v2/schema/schema/#input-types