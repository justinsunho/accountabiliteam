import { useSession, signIn, signOut } from 'next-auth/react'
import Header from './Header'
import Footer from './Footer'

const MainLayout = ({ children }) => {
	return (
		<div>
			<Header />

			<main className={'container mx-auto px-4'}>
				<div>
					{children}
					<button onClick={() => signOut()}>Sign out</button>
				</div>
			</main>

			<Footer />
		</div>
	)
}

export default MainLayout
