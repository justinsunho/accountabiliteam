import AuthFlow from 'src/utilities/AuthFlow'
import { MainLayout } from 'src/components/layouts'
import { ApolloProvider } from '@apollo/client'
import { SessionProvider } from 'next-auth/react'
import client from '../apollo-client'
import 'src/styles/globals.css'

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<ApolloProvider client={client}>
			<SessionProvider session={session}>
				<AuthFlow>
					<MainLayout>
						<Component {...pageProps} />
					</MainLayout>
				</AuthFlow>
			</SessionProvider>
		</ApolloProvider>
	)
}
