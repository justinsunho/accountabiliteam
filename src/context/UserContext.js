import { createContext, useContext } from 'react'
import { gql, useQuery } from '@apollo/client'

const SESSION_QUERY = gql`
	query Session {
		session {
			userId
		}
	}
`

const UserContext = createContext()

export function UserWrapper({ children }) {
	const { data, loading, error } = useQuery(SESSION_QUERY)

	let userId = data?.session?.userId

	return (
		<UserContext.Provider value={userId}>{children}</UserContext.Provider>
	)
}

export function useUserContext() {
	return useContext(UserContext)
}
