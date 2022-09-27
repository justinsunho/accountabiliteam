import { signIn, signOut } from 'next-auth/react'
import { useUserContext } from 'src/context/UserContext'
import * as styles from './styles.module.scss'

const MainLayout = ({ children }) => {
	const userId = useUserContext()

	return (
		<main className={styles.layout}>
			{userId ? (
				<div>
					{children}
					{JSON.stringify(userId)}
					<button onClick={() => signOut()}>Sign out</button>
				</div>
			) : (
				<>
					Not signed in <br />
					<button onClick={() => signIn()}>Sign in</button>
				</>
			)}
		</main>
	)
}

export default MainLayout
