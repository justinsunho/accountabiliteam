import { signIn, signOut, useSession } from 'next-auth/react'

const AuthFlow = ({ children }) => {
	const session = useSession()
	const userId = session?.data?.user?.id

	return (
		<>
			{userId ? (
				<div>
					{children}
					<div>
						<button onClick={() => signOut()}>signout</button>
					</div>
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
