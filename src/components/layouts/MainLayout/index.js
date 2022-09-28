import { signIn, signOut } from 'next-auth/react'
import { useUserContext } from 'src/context/UserContext'
import Header from './Header'
import Footer from './Footer'
import * as styles from './styles.module.scss'

const MainLayout = ({ children }) => {
	const userId = useUserContext()

	return (
		<div className={`${styles.layout}`}>
			<Header />

			<main className={styles.contentWrapper}>
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
			<Footer />
		</div>
	)
}

export default MainLayout
