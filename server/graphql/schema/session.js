import { gql } from 'apollo-server'

export const sessionTypeDefs = gql`
	type Session {
		id: ID!
		sessionToken: String
		userId: String
		user: User
	}

	type Query {
		session: Session
	}
`

export const sessionResolvers = {
	Query: {
		session: (parent, args, context) => {
			return context.prisma.session.findFirst({
				include: { user: true },
			})
		},
	},
}
