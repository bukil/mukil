/*
	Redirect page for Data Visualisation
	- Keeps /dataviz as a valid Next.js page (default export present)
	- Redirects client-side to external GitHub Pages project
*/
import { useEffect } from 'react'
import { Box, Link, Text } from '@chakra-ui/react'

const EXTERNAL_URL = 'https://bukil.github.io/dataviz/'

export default function DataVizRedirect() {
	useEffect(() => {
		// Client-side redirect
		if (typeof window !== 'undefined') {
			window.location.replace(EXTERNAL_URL)
		}
	}, [])

	return (
		<Box minH="60vh" display="flex" alignItems="center" justifyContent="center" flexDir="column" color="#fff" textAlign="center" p={8}>
			<Text fontSize="xl" mb={2}>Redirecting to the Data Visualisation project…</Text>
			<Link href={EXTERNAL_URL} isExternal color="#89EF8C" textDecoration="underline">
				Click here if you are not redirected
			</Link>
		</Box>
	)
}

