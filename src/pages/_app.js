import AuthFlow from 'src/components/utilities/AuthFlow'
import Header from 'src/components/layouts/MainLayout/Header'
import { ApolloProvider } from '@apollo/client'
import { SessionProvider } from 'next-auth/react'
import client from '../apollo-client'
import 'src/styles/globals.css'
import { AnimatePresence } from 'framer-motion'
import { DirectionProvider } from 'src/components/contexts/DirectionContext'

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<ApolloProvider client={client}>
			<DirectionProvider>
				<SessionProvider session={session}>
					<AuthFlow>
						<AnimatePresence
							exitBeforeEnter
							initial={false}
							onExitComplete={() => window.scrollTo(0, 0)}
						>
							<Component {...pageProps} />
						</AnimatePresence>
					</AuthFlow>
				</SessionProvider>
			</DirectionProvider>
		</ApolloProvider>
	)
}
