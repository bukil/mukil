import { Heading, Text, VStack, Box } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'

const Blog = () => {
  const textColor = '#1a202c'
  const pinkLine = '#b83280'

  // BookReviewCard component for compact book review tiles
  function BookReviewCard({ title, author, rating, review }) {
    const cardTextColor = '#1a202c'
    return (
      <Box
        bg="rgba(0, 0, 0, 0.02)"
        borderRadius="12px"
        boxShadow="0 2px 12px 0 rgba(0,0,0,0.05)"
        p={4}
        minH={"140px"}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
        border="1px solid rgba(0, 0, 0, 0.08)"
        backdropFilter="blur(8px)"
        style={{ WebkitBackdropFilter: 'blur(8px)' }}
      >
        <Text fontWeight="bold" fontSize="md" color={cardTextColor} mb={1}>{title}</Text>
        <Text fontSize="xs" color="gray.600" mb={1}>{author}</Text>
        <Text fontSize="md" color="#d97706" mb={1}>{rating}</Text>
        <Text fontSize="xs" color="gray.700">{review}</Text>
      </Box>
    )
  }

  return (
    <Layout title="Blog">
      <Box minH="100vh" py={0} w="100%" maxW="100vw" overflowX="hidden">
        <Box minH="100vh" py={0} position="relative" zIndex={1} w="100%" maxW="100vw">
          <VStack spacing={8} align="stretch" w="100%">
            {/* Hero Section */}
            <VStack spacing={4} align="center" pt={12} pb={4} w="100%">
              <Heading
                as="h1"
                fontSize={{ base: '4xl', md: '6xl' }}
                fontWeight="bold"
                textAlign="center"
                color={textColor}
                letterSpacing="tight"
              >
                ...
              </Heading>
              <Text
                fontSize={{ base: 'xl', md: '2xl' }}
                textAlign="center"
                color={textColor}
                maxW="2xl"
              >
                Thoughts, Reviews & Photography
              </Text>
            </VStack>

            {/* Book Reviews Grid - square tiles */}
            <Section>
              <Box w="100%" display="flex" justifyContent="center" mt={4} mb={12}>
                <Box w={{ base: '100%', md: '80%', lg: '70%' }}>
                  <Box fontWeight="bold" fontSize="2xl" mb={4} color={textColor}>Book Reviews</Box>
                  <Box as={"div"}>
                    <Box display="grid" gridTemplateColumns={{ base: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }} gap={2}>
                      <BookReviewCard
                        title="Influence"
                        author="Robert Cialdini"
                        rating="★★★★☆"
                        review="Sharpened my awareness, now I spot persuasion tactics everywhere. Super practical and scary real."
                        color={pinkLine}
                      />
                      <BookReviewCard
                        title="How Google Works"
                        author="Eric Schmidt & Jonathan Rosenberg"
                        rating="★★★☆☆"
                        review="Feels a bit polished , like the official 'Google tour', Some good insights on culture and hiring, but felt a bit like a PR piece in parts. Still useful if you're into org-building."
                        color={pinkLine}
                      />
                      <BookReviewCard
                        title="सारा आकाश"
                        author="राजेंद्र यादव"
                        rating="★★★☆☆"
                        review="किताब पढ़ते-पढ़ते यही लगा कि ये बहुत पुराने दौर की बात है। सोच, व्यवहार, सब कुछ इतना अलग था,  उसने तो सिर्फ़ 12वीं ही पास की थी। जो फैसले उसने लिए, जो ग़लतियाँ कीं, वो बचपना लगती हैं… लेकिन शायद ज़िंदगी ऐसे ही चलती है।"
                        color={pinkLine}
                      />
                      <BookReviewCard
                        title="Console Wars"
                        author="Blake J. Harris"
                        rating="★★★★☆"
                        review="Awesome and a must for those who know what is 6502. I mean, it's a long way from William Higinbotham to today's advanced game industry. And now here we are, waiting for GTA 6."
                        color={pinkLine}
                      />
                      <BookReviewCard
                        title="The Brothers Karamazov"
                        author="Fyodor Dostoevsky"
                        rating="★★★★☆"
                        review="Big, philosophical, and layered. Took effort, but worth it. The courtroom scenes and Ivan's rebellion stay with you."
                        color={pinkLine}
                      />
                      <BookReviewCard
                        title="Crime and Punishment"
                        author="Fyodor Dostoevsky"
                        rating="★★★★★"
                        review="Intense and psychological. I read it almost like a thriller. Raskolnikov's torment felt personal like a mirror in moments of guilt."
                        color={pinkLine}
                      />
                      <BookReviewCard
                        title="The Idiot"
                        author="Fyodor Dostoevsky"
                        rating="★★★★★"
                        review="Prince Myshkin broke my heart. His purity in a corrupt world felt like watching a flower trampled in slow motion. Deeply human and unforgettable."
                        color={pinkLine}
                      />
                      <BookReviewCard
                        title="Notes from Underground"
                        author="Fyodor Dostoevsky"
                        rating="★★★★☆"
                        review="This one is messy , in a good way. The narrator frustrates you, but you also feel him. It's a book that reminded me how irrational i am beneath my polished choices."
                        color={pinkLine}
                      />
                      <BookReviewCard
                        title="The Design of Everyday Things"
                        author="Don Norman"
                        rating="★★☆☆☆"
                        review="Not what i was expecting, overall a good read."
                        color={pinkLine}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Section>
          </VStack>
        </Box>
      </Box>
    </Layout>
  )
}

export default Blog