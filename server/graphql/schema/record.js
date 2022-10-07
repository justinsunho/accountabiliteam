import { gql } from 'apollo-server'
import { GraphQLScalarType, Kind } from 'graphql'

const dateScalar = new GraphQLScalarType({
	name: 'Date',
	description: 'Date custom scalar type',
	serialize(value) {
		return value.getTime() // Convert outgoing Date to integer for JSON
	},
	parseValue(value) {
		return new Date(value) // Convert incoming integer to Date
	},
	parseLiteral(ast) {
		if (ast.kind === Kind.INT) {
			return new Date(parseInt(ast.value, 10)) // Convert hard-coded AST string to integer and then to Date
		}
		return null // Invalid hard-coded value (not an integer)
	},
})

export const recordTypeDefs = gql`
	scalar Date

	type Record {
		id: ID!
		habit: Habit
		completed: Boolean
		createdAt: Date
		updatedAt: Date
		user: User
		userId: ID
		habitId: ID
	}

	input RecordInput {
		completed: Boolean
		habitId: ID
		userId: ID
	}

	type Query {
		records: [Record]
		todayRecord(input: RecordInput): Record
		todayRecords(input: RecordInput): [Record]
	}

	type Mutation {
		createRecord(input: RecordInput): Record
		updateRecord(id: ID!, input: RecordInput): Record
		deleteRecord(id: ID!): Record
	}
`

const today = new Date()
today.setHours(0, 0, 0, 0)
const endOfDay = new Date()
endOfDay.setHours(23, 59, 59, 999)

export const recordResolvers = {
	Date: dateScalar,
	Query: {
		records: (parent, args, context) => {
			return context.prisma.record.findMany()
		},
		todayRecord: (parent, args, context) => {
			return context.prisma.record.findFirst({
				where: {
					AND: [
						{
							habitId: {
								equals: args.input.habitId,
							},
						},
						{
							userId: {
								equals: args.input.userId,
							},
						},
						{
							createdAt: {
								gte: today,
								lte: endOfDay,
							},
						},
					],
				},
			})
		},
		todayRecords: (parent, args, context) => {
			return context.prisma.record.findMany({
				where: {
					AND: [
						{
							habitId: {
								equals: args.input.habitId,
							},
						},
						{
							createdAt: {
								gte: today,
								lte: endOfDay,
							},
						},
					],
					NOT: {
						userId: {
							equals: args.input.userId,
						},
					},
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
