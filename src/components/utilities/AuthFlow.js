import { signIn, signOut, useSession } from 'next-auth/react'
import { MainLayout } from 'src/components/layouts'
import { Button } from 'src/components/atoms'

const AuthFlow = ({ children }) => {
	const session = useSession()
	const userId = session?.data?.user?.id

	return (
		<>
			{userId ? (
				<>{children}</>
			) : (
				<div className="container m-auto mt-8 p-4">
					<h1 className="mb-4 text-5xl font-semibold">
						Not Signed In
					</h1>
					<Button onClick={() => signIn()}>Sign in</Button>
				</div>
			)}
		</>
	)
}

export default AuthFlow
