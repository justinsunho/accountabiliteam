import AuthFlow from 'src/components/utilities/AuthFlow'
import Header from 'src/components/organisms/Header'
import { ApolloProvider } from '@apollo/client'
import { SessionProvider } from 'next-auth/react'
import client from '../apollo-client'
import 'src/styles/globals.css'
import { AnimatePresence } from 'framer-motion'

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<ApolloProvider client={client}>
			<SessionProvider session={session}>
				<AuthFlow>
					<Header />
					<AnimatePresence
						exitBeforeEnter
						initial={false}
						onExitComplete={() => window.scrollTo(0, 0)}
					>
						<Component {...pageProps} />
					</AnimatePresence>
				</AuthFlow>
			</SessionProvider>
		</ApolloProvider>
	)
}
