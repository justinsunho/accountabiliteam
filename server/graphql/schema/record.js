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
		createdAt: String
		updatedAt: String
		user: User
		userId: ID
		habitId: ID
	}

	input RecordInput {
		completed: Boolean
		habitId: ID
		userId: ID
	}

	type Mutation {
		createRecord(input: RecordInput): Record
		updateRecord(id: ID!, input: RecordInput): Record
		deleteRecord(id: ID!): Record
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
				},
			})
		},
	},
	Mutation: {
		createRecord: (parent, { input }, context) => {
			return context.prisma.record.create({
				data: {
					completed: input.completed,
					habit: {
						connect: { id: input.habitId },
					},
					user: {
						connect: { id: input.userId },
					},
				},
			})
		},
		updateRecord: (parent, args, context) => {
			return context.prisma.record.update({
				where: {
					id: args.id,
				},
				data: {
					completed: args.input.completed,
					habit: {
						connect: { id: args.input.habitId },
					},
					user: {
						connect: { id: args.input.userId },
					},
				},
			})
		},
		deleteRecord: (parent, args, context) => {
			return context.prisma.record.delete({
				where: {
					id: args.id,
				},
			})
		},
	},
}
