import { signOut } from 'next-auth/react'

export default function SignIn({ data }) {
	return (
		<>
			<button onClick={() => alert(data.session.user.email)}>
				create habit
			</button>
			<button onClick={() => signOut()}>Sign out</button>
		</>
	)
}
