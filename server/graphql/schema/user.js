import { gql } from 'apollo-server'

export const userTypeDefs = gql`
	type User {
		id: ID!
		email: String
		name: String
		groups: [Group]
		habits: [Habit]
		records: [Record]
	}

	type Query {
		users: [User]
		user(id: ID, email: String): User
		me: User
	}

	input UserInput {
		name: String
		groupIds: [ID]
		habitIds: [ID]
		recordIds: [ID]
	}

	type Mutation {
		updateUser(id: ID!, input: UserInput): User
		# deleteUser(id: ID!): User
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
	Mutation: {
		updateUser: (parent, args, context) => {
			return context.prisma.user.update({
				where: {
					id: args.id,
				},
				data: {
					name: args.input.name,
					groups: {
						set: args.input.groupIds.map((groupId) => {
							return {
								id: groupId,
							}
						}),
					},
					habits: {
						set: args.input.habitIds.map((habitId) => {
							return {
								id: habitId,
							}
						}),
					},
					records: {
						set: args.input.recordIds.map((recordId) => {
							return {
								id: recordId,
							}
						}),
					},
				},
			})
		},
		// deleteUser: (parent, args, context) => {
		// 	return context.prisma.user.delete({
		// 		where: {
		// 			id: args.id,
		// 		},
		// 	})
		// },
	},
}
