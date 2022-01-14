import { gql } from 'apollo-server'

export const recordTypeDefs = gql`
	type Query {
		records: [Record]
		record(id: ID!): Record
	}

	type Record {
		id: ID!
		habit: Habit
		completed: Boolean
		updatedAt: String
		user: User
		userId: ID
		habitId: ID
	}
`

export const recordResolvers = {
	Query: {
		records: (parent, args, context) => {
			return context.prisma.record.findMany()
		},
		record: (parent, args, context) => {
			return context.prisma.record.findUnique({
				where: {
					id: args.id,
					habitId: args.habitId,
					userId: args.userId,
				},
			})
		},
	},
}
