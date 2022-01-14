import { ApolloServer } from 'apollo-server'
import { PrismaClient } from '@prisma/client'
import { typeDefs, resolvers } from './graphql'

const prisma = new PrismaClient()

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: {
		prisma,
	},
})

server.listen().then(() => {
	console.log(`
    Server is running!
    Listening on port 4000
    Explore at https://studio.apollographql.com/sandbox
  `)
})
