import { gql } from 'apollo-server'

export const userTypeDefs = gql`
	type Query {
		users: [User]
		user(id: ID, email: String): User
		me: User
	}

	type User {
		id: ID!
		email: String
		name: String
		groups: [Group]
		habits: [Habit]
		record: Record
	}
`

export const userResolvers = {
	Query: {
		users: (parent, args, context) => {
			return context.prisma.user.findMany()
		},
		user: (parent, args, context) => {
			return context.prisma.user.findUnique({
				where: { id: args.id, email: args.email },
			})
		},
	},
}
