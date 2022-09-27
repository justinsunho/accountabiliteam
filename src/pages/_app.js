import { MainLayout } from 'src/components/layouts'
import { UserWrapper } from 'src/context/UserContext'
import { ApolloProvider } from '@apollo/client'
import client from '../apollo-client'
import '../styles/globals.scss'

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<ApolloProvider client={client}>
			<UserWrapper>
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			</UserWrapper>
		</ApolloProvider>
	)
}
