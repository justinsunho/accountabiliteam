import { gql } from 'apollo-server'

export const groupTypeDefs = gql`
	type Query {
		groups: [Group]
		group(id: ID!): Group
	}

	type Group {
		id: ID!
		name: String
		users: [User]
		habits: [Habit]
	}
`

export const groupResolvers = {
	Query: {
		groups: (parent, args, context) => {
			return context.prisma.group.findMany({
				include: {
					users: true,
					habits: true,
				},
			})
		},
		group: (parent, args, context) => {
			return context.prisma.group.findUnique({
				where: {
					id: args.id,
				},
			})
		},
	},
}
