import { SessionProvider } from 'next-auth/react'
import { ApolloProvider } from '@apollo/client'
import client from '../apollo-client'

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<SessionProvider session={session}>
			<ApolloProvider client={client}>
				<Component {...pageProps} />
			</ApolloProvider>
		</SessionProvider>
	)
}
