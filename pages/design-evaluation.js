import { Box, AspectRatio, Image, Text } from '@chakra-ui/react'
import Layout from '../components/layouts/article'

const DesignEvaluation = () => {
	const svgSeries = [
		'1.svg','2.svg','3.svg','4.svg','5.svg','6.svg','7.svg','8.svg','9.svg','10.svg',
		'11.svg','12.svg','13.svg','14.svg','15.svg','16.svg','17.svg','18.svg','19.svg','20.svg',
		'21.svg','22.svg','23.svg','24.svg',
		// additional figs if needed (after numeric sequence)
		'fig.svg','fig2.svg','fig3.svg','f2.svg','f3.svg','Frame.svg'
	]
	return (
		<Layout title="ChatGPT UI/UX Evaluation">
				{/* Page background forced to white (covers full viewport) */}
				<Box position="fixed" top={0} left={0} right={0} bottom={0} bg="white" zIndex={-1} />
					{/* SVG series full-bleed */}
			<Box w="100vw" ml="calc(50% - 50vw)" py={{ base: 0, md: 0 }}>
				{svgSeries.map((name) => (
					<Box key={name} as="figure">
						<Image
							src={`/gpt/${name}`}
							alt={`GPT evaluation figure ${name}`}
							width="100%"
							height="auto"
							display="block"
						/>
					</Box>
				))}
			</Box>

					{/* Figma embed last, full-bleed with small left gap and label */}
					<Box w="100vw" ml="calc(50% - 50vw)" py={{ base: 0, md: 0 }}>
						<Box
							width={{ base: 'calc(100vw - 16px)', md: 'calc(100vw - 24px)' }}
							ml={{ base: 4, md: 6 }}
						>
							<Text fontSize="sm" color="gray.600" mb={2}>
								test prototype
							</Text>
							<AspectRatio ratio={16 / 9}>
								<Box
									as="iframe"
									title="Figma — GPT Design Evaluation"
									src="https://embed.figma.com/proto/ljPaoKRHVC9aV1Z1IyAhbj/GPT-Design-Evaluation?page-id=229%3A582&node-id=288-1587&p=f&viewport=372%2C514%2C0.17&scaling=scale-down&content-scaling=fixed&starting-point-node-id=288%3A1587&embed-host=share&hide-ui=1&background=transparent"
									style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
									allowFullScreen
								/>
							</AspectRatio>
						</Box>
					</Box>
		</Layout>
	)
}

export default DesignEvaluation
