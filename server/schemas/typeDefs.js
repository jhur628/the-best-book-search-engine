const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]!
    bookCount: Int
}

type Book {
    authors: [String]
    description: String
    bookId: String!
    image: String
    link: String
    title: String!
}

type Auth {
    _id: ID!
    user: User
}

type Query {
    me: User
}
`

//Input types: https://www.apollographql.com/docs/apollo-server/v2/schema/schema/#input-types