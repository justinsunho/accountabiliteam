import { ApolloServer } from 'apollo-server'
import { PrismaClient } from '@prisma/client'
import { typeDefs, resolvers } from './graphql'
import * as cron from 'node-cron'

const prisma = new PrismaClient()

cron.schedule('0 21 0 * * *', () => {
	main()
		.then(async () => {
			await prisma.$disconnect()
		})
		.catch(async (e) => {
			console.error(e)
			await prisma.$disconnect()
			process.exit(1)
		})
})

async function main() {
	const habits = await prisma.habit.findMany({
		include: {
			users: true,
		},
	})
	habits.forEach(async (habit) => {
		await prisma.record.createMany({
			data: habit.users.map((user) => {
				return {
					completed: false,
					userId: user.id,
					habitId: habit.id,
				}
			}),
		})
	})
}

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
