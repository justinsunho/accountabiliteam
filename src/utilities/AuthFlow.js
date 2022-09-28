import { signIn, signOut, useSession } from 'next-auth/react'

const AuthFlow = ({ children }) => {
	const session = useSession()
	const userId = session?.data?.user?.id

	return (
		<>
			{userId ? (
				<div>
					{children}
					<button onClick={() => signOut()}>Sign out</button>
				</div>
			) : (
				<>
					Not signed in <br />
					<button onClick={() => signIn()}>Sign in</button>
				</>
			)}
		</>
	)
}

export default AuthFlow
