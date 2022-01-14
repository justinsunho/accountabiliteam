import { useSession, signIn, signOut } from 'next-auth/react'
import { useQuery, gql, useMutation } from '@apollo/client'

// const QUERY = gql`
//   query Query {
//     users {
//       id
//       name
//     }
//   }
// `;

const MUTATION = gql`
	mutation createHabit($name: String!) {
		createHabit(name: $name) {
			id
			name
		}
	}
`

export default function Home() {
	const { data: session } = useSession()
	// const { data, loading, error } = useQuery(QUERY);
	const [createHabit, { d, l, e }] = useMutation(MUTATION)

	// if (loading) {
	//   return <>loading</>;
	// }

	// if (error) {
	//   return <>error</>;
	// }

	// const { users } = data;

	if (session) {
		return (
			<>
				Signed in as {session.user.email} <br />
				<button
					onClick={() => createHabit({ variables: { name: 'hi' } })}
				>
					test
				</button>
				<button onClick={() => signOut()}>Sign out</button>
				{/* {users.map(item => (
          <div>
            {item.email}
            {item.name}
            {item.id}
          </div>
        ))} */}
			</>
		)
	}
	return (
		<>
			Not signed in <br />
			<button onClick={() => signIn()}>Sign in</button>
		</>
	)
}
