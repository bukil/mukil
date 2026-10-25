import React from 'react'
import {
  Box,
  SimpleGrid,
  Image,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import NextLink from 'next/link'
import dynamic from 'next/dynamic'
import MunselModel from './MunselModel'
import KodeboardModal from './projects/Kodeboard'
import Section from './section'
import ApplePasswordModal from './ApplePasswordModal'

const HairlineHub = dynamic(
  () => import('@lucasmarkes/hairline/react').then((m) => m.Hub),
  { ssr: false }
)

const HairlineDish = dynamic(
  () => import('@lucasmarkes/hairline/react').then((m) => m.Dish),
  { ssr: false }
)


export const ProjectPanel = ({
  title,
  hoverTitle,
  description,
  imageSrc,
  imageAlt,
  gradientColors: _gradientColors,
  hoverGradientColors: _hoverGradientColors,
  accentColor,
  onClick,
  customContent,
  aspectRatio = '1 / 1',
  isSimpleTile = false,
  sx
}) => {
  return (
    <Box
      position="relative"
      borderWidth="1px"
      borderColor="rgba(0, 0, 0, 0.15)"
      borderRadius={0}
      overflow="hidden"
      boxShadow="none"
      role="group"
      bg="transparent"
      transition="border-color 0.3s ease, box-shadow 0.3s ease"
      _hover={{
        bg: 'transparent',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
        borderColor: 'rgba(0, 0, 0, 0.3)'
      }}
      onClick={onClick}
      cursor="pointer"
      width="100%"
      maxW="100%"
      aspectRatio={aspectRatio}
      sx={{
        ...sx,
        '& *': {
          pointerEvents: 'none'
        },
        '& [data-hairline], & [data-hairline] *': {
          pointerEvents: 'auto'
        }
      }}
    >
      {!isSimpleTile && (
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="76px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            position="absolute"
            top={
              hoverTitle === "Data Visualisation" ||
              hoverTitle === "Design Evaluation ChatGPT" ||
              hoverTitle === "Daksha in Orbit" ||
              hoverTitle === "Apple HIG Architecture"
                ? "3%"
                : "20%"
            }
            right={hoverTitle === "Data Visualisation" ? "5%" : undefined}
            left={hoverTitle === "Data Visualisation" ? undefined : "50%"}
            transform={
              hoverTitle === "Data Visualisation"
                ? "none"
                : hoverTitle === "Design Evaluation ChatGPT" ||
                  hoverTitle === "Daksha in Orbit" ||
                  hoverTitle === "Apple HIG Architecture"
                ? "translate(-50%, 0)"
                : "translate(-50%, -50%)"
            }
            textAlign={hoverTitle === "Data Visualisation" ? "right" : "center"}
            fontSize={
              hoverTitle === "Data Visualisation" || hoverTitle === "Design Evaluation ChatGPT"
                ? "7xl"
                : "6xl"
            }
            fontWeight="900"
            color="#111827"
            opacity="0"
            transition="top 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
            whiteSpace="nowrap"
            _groupHover={{
              opacity: 0.7,
              top:
                hoverTitle === "Data Visualisation" ||
                hoverTitle === "Design Evaluation ChatGPT" ||
                hoverTitle === "Daksha in Orbit" ||
                hoverTitle === "Apple HIG Architecture"
                  ? "3%"
                  : "35%",
              transform:
                hoverTitle === "Data Visualisation"
                  ? "none"
                  : hoverTitle === "Design Evaluation ChatGPT" ||
                    hoverTitle === "Daksha in Orbit" ||
                    hoverTitle === "Apple HIG Architecture"
                  ? "translate(-50%, 0)"
                  : "translate(-50%, -50%)",
              transition: "top 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
            zIndex={2}
            letterSpacing="normal"
            lineHeight="1"
            fontFamily="'BaseNeueTrial', sans-serif"
            fontStyle="italic"
            textTransform="uppercase"
          >
            {hoverTitle === "Design Evaluation ChatGPT" ? (
              <>
                <span>Design Evaluation</span><br />
                <span>ChatGPT</span>
              </>
            ) : hoverTitle === "Visually understanding Colour space" ? (
              <>
                <span>Visually understanding</span><br />
                <span>Colour space</span>
              </>
            ) : hoverTitle === "Daksha in Orbit" ? (
              <>
                <span>Daksha in</span><br />
                <span>Orbit</span>
              </>
            ) : hoverTitle === "Apple HIG Architecture" ? (
              <>
                <span>Apple HIG</span><br />
                <span>Architecture</span>
              </>
            ) : (
              hoverTitle || title
            )}
          </Text>
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={title === "Kode/Board" ? "82%" : "68%"}
              height={title === "Kode/Board" ? "82%" : "68%"}
              objectFit="contain"
              transition="transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease"
              _groupHover={{
                filter: 'brightness(1.05)',
                transform: 'scale(1.06)'
              }}
              position="relative"
              zIndex="1"
              bg="transparent"
            />
          )}
        </Box>
      )}
      {!isSimpleTile && (title || description) && (
        <Box
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          bg="rgba(255, 255, 255, 0.95)"
          backdropFilter="blur(8px)"
          pt={2}
          pb={2}
          px={4}
          color="gray.900"
          zIndex={3}
          height="76px"
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          borderTop="1px solid rgba(0, 0, 0, 0.08)"
        >
          {title && (
            <Box mb={0}>
              <Text
                fontSize="xs"
                fontFamily="'Michroma', monospace"
                fontWeight="600"
                letterSpacing="0.12em"
                lineHeight="1.1"
                textTransform="uppercase"
                color="gray.900"
              >
                {title}
              </Text>
            </Box>
          )}
          <Box
            w="100%"
            h="1px"
            bg={accentColor || 'rgba(0, 0, 0, 0.15)'}
            mt={1.5}
            mb={1.5}
          />
          <Box flex="0 0 auto">
            <Text
              fontSize="xs"
              fontFamily="'Encode Sans Expanded', sans-serif"
              fontWeight="400"
              letterSpacing="0.5px"
              color="gray.600"
              noOfLines={2}
              lineHeight="1.3"
            >
              {description}
            </Text>
          </Box>
        </Box>
      )}
      {customContent && (
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom={isSimpleTile ? '0' : '76px'}
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={1}
          pointerEvents="none"
          sx={{
            '& img': {
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease',
              willChange: 'transform, opacity'
            },
            '& img.phone-large': {
              transformOrigin: '50% 50%'
            },
            '& canvas': {
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform'
            }
          }}
          _groupHover={{
            '& img': {
              transform: 'scale(1.06)'
            },
            '& img.phone-large': {
              transformOrigin: '50% 50%',
              transform: 'scale(1.06)'
            },
            '& canvas': {
              transform: 'scale(1.06)'
            }
          }}
        >
          {customContent}
        </Box>
      )}
    </Box>
  )
}

export function DesignSystemGraphic() {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      pointerEvents="auto"
      data-hairline=""
      sx={{
        '--hairline-plate': '#ffffff',
        '--hairline-hi': '#232327',
        '--hairline-edge': '#a4a4ac',
        '--hairline-mid': '#c3c3c9',
        '--hairline-lo': '#e0e0e4',
        '--hairline-stroke': '0.9',
      }}
    >
      <Box
        width="460px"
        maxW="96%"
        position="relative"
        transform="translateY(-17px) scale(1.18)"
        transformOrigin="center center"
        transition="transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
        _groupHover={{
          transform: 'translateY(-17px) scale(1.25)'
        }}
      >
        <HairlineHub play intensity={0.7} />
      </Box>
    </Box>
  );
}

export function DakshaGraphic() {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      pointerEvents="auto"
      data-hairline=""
      sx={{
        '--hairline-plate': '#ffffff',
        '--hairline-hi': '#232327',
        '--hairline-edge': '#a4a4ac',
        '--hairline-mid': '#c3c3c9',
        '--hairline-lo': '#e0e0e4',
        '--hairline-stroke': '0.9',
      }}
    >
      <Box
        width="460px"
        maxW="96%"
        position="relative"
        transform="translateY(-17px) scale(1.18)"
        transformOrigin="center center"
        transition="transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
        _groupHover={{
          transform: 'translateY(-17px) scale(1.25)'
        }}
      >
        <HairlineDish play intensity={0.7} />
      </Box>
    </Box>
  )
}

export function AppleHIGGraphic() {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <Image
        src="/images/1016@2x.jpg"
        alt="macOS Wallpaper"
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        objectFit="cover"
        objectPosition="center"
        transition="transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
        _groupHover={{
          transform: 'scale(1.06)'
        }}
      />
      <Box
        position="relative"
        zIndex={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
        transition="transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
        _groupHover={{
          transform: 'scale(1.08)'
        }}
      >
        <Image
          src="/images/Apple-Logo.png"
          alt="Apple Logo"
          width={{ base: '120px', sm: '150px', md: '190px', lg: '220px' }}
          height="auto"
          objectFit="contain"
          filter="drop-shadow(0 8px 30px rgba(0, 0, 0, 0.32))"
        />
      </Box>
    </Box>
  )
}

export function ChatGPT3DGraphic() {
  const gptPath =
    'M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z';

  const isoTransform = 'matrix(2.42487, 1.4, -2.42487, 1.4, 0, 0) translate(-12, -12)';
  const extrusionSteps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      pointerEvents="none"
      data-hairline=""
      transition="transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
      _groupHover={{
        transform: 'scale(1.06)'
      }}
      sx={{
        '--hairline-plate': '#ffffff',
        '--hairline-hi': '#232327',
        '--hairline-edge': '#a4a4ac',
        '--hairline-mid': '#c3c3c9',
        '--hairline-lo': '#e0e0e4',
        '--hairline-stroke': '0.9',
        '& svg': {
          width: '100%',
          height: '100%',
          display: 'block'
        },
        '& path, & polygon, & line, & circle': {
          vectorEffect: 'non-scaling-stroke',
          strokeLinejoin: 'round',
          strokeLinecap: 'round'
        }
      }}
    >
      <svg
        viewBox="0 0 540 464"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <g id="chatgpt-scaled-complex" transform="translate(270, 232) scale(1.50) translate(-270, -114)">
          <g id="isometric-plinth">
            <polygon
              points="146,114 270,185 270,193 146,122"
              fill="#ffffff"
              stroke="#a4a4ac"
              strokeWidth="0.9"
            />
            <polygon
              points="270,185 394,114 394,122 270,193"
              fill="#ffffff"
              stroke="#a4a4ac"
              strokeWidth="0.9"
            />
            <polygon
              points="270,43 394,114 270,185 146,114"
              fill="#ffffff"
              stroke="#232327"
              strokeWidth="0.9"
            />
            <g stroke="#e0e0e4" strokeWidth="0.8" strokeDasharray="2 4">
              <line x1="177" y1="96" x2="301" y2="167" />
              <line x1="208" y1="78" x2="332" y2="149" />
              <line x1="239" y1="60" x2="363" y2="131" />
              <line x1="363" y1="96" x2="239" y2="167" />
              <line x1="332" y1="78" x2="208" y2="149" />
              <line x1="301" y1="60" x2="177" y2="131" />
            </g>
            <g stroke="#a4a4ac" strokeWidth="0.8">
              <line x1="140" y1="114" x2="152" y2="114" />
              <line x1="146" y1="108" x2="146" y2="120" />
              <line x1="388" y1="114" x2="400" y2="114" />
              <line x1="394" y1="108" x2="394" y2="120" />
              <line x1="264" y1="43" x2="276" y2="43" />
              <line x1="270" y1="37" x2="270" y2="49" />
              <line x1="264" y1="185" x2="276" y2="185" />
              <line x1="270" y1="179" x2="270" y2="191" />
            </g>
            <circle cx="146" cy="114" r="1.6" fill="#232327" />
            <circle cx="394" cy="114" r="1.6" fill="#232327" />
            <circle cx="270" cy="43" r="1.6" fill="#232327" />
            <circle cx="270" cy="185" r="1.6" fill="#232327" />
            <circle cx="270" cy="114" r="1.5" fill="#a4a4ac" />
          </g>

          <g transform="translate(270, 114)">
            <path
              d={gptPath}
              transform={isoTransform}
              fill="none"
              stroke="#e0e0e4"
              strokeWidth="0.85"
              strokeDasharray="2 3"
            />
          </g>

          <g stroke="#c3c3c9" strokeWidth="0.8" strokeDasharray="1 3">
            <line x1="270" y1="96" x2="270" y2="114" />
            <line x1="220" y1="96" x2="220" y2="114" />
            <line x1="320" y1="96" x2="320" y2="114" />
            <line x1="245" y1="82" x2="245" y2="100" />
            <line x1="295" y1="82" x2="295" y2="100" />
            <line x1="270" y1="68" x2="270" y2="86" />
          </g>

          <g
            id="chatgpt-isometric-body"
            className="hairline-interactive-knot"
            style={{
              transform: 'translateY(-16px)',
              transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
            }}
          >
            {extrusionSteps.map((step) => (
              <g key={step} transform={`translate(270, ${114 - step})`}>
                <path
                  d={gptPath}
                  transform={isoTransform}
                  fill="#ffffff"
                  stroke={step === 1 ? '#a4a4ac' : '#c3c3c9'}
                  strokeWidth="0.9"
                />
              </g>
            ))}

            <g transform="translate(270, 99)">
              <path
                d={gptPath}
                transform={isoTransform}
                fill="#ffffff"
                stroke="#232327"
                strokeWidth="1.0"
              />
              <path
                d={gptPath}
                transform={isoTransform}
                fill="none"
                stroke="#232327"
                strokeWidth="0.9"
              />
              <polygon
                points="-3,-1 0,1 3,-1 3,-3 0,-1 -3,-3"
                fill="#232327"
                opacity="0.25"
              />
              <circle cx="0" cy="-28" r="1.6" fill="#232327" />
              <circle cx="48" cy="0" r="1.6" fill="#232327" />
              <circle cx="-48" cy="0" r="1.6" fill="#232327" />
              <circle cx="0" cy="28" r="1.6" fill="#232327" />
              <circle cx="0" cy="0" r="1.4" fill="#a4a4ac" />
            </g>
          </g>
        </g>
      </svg>
    </Box>
  );
}

export default function ProjectsGrid({ mt = 0, ...props }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isAppleOpen,
    onOpen: onOpenApple,
    onClose: onCloseApple
  } = useDisclosure()

  return (
    <>
      <Box w="100%" mt={mt} {...props}>
        <SimpleGrid columns={{ base: 1, md: 2 }} columnGap={{ base: 5, md: 6, lg: 8 }} rowGap={{ base: 6, md: 8, lg: 10 }}>
          {/* 1. Intelligent Design System Architecture for Apple HIG (Wide Simple Tile) */}
          <Section gridColumn={{ base: 'span 1', md: 'span 2' }}>
            <ProjectPanel
              isSimpleTile
              aspectRatio={{ base: '1 / 1', sm: '16 / 9', md: '2.1 / 1' }}
              customContent={<AppleHIGGraphic />}
              onClick={onOpenApple}
            />
          </Section>

          {/* 2. Daksha in Orbit */}
          <Section>
            <ProjectPanel
              title={
                <span style={{ fontFamily: 'Michroma, monospace', letterSpacing: '0.12em', color: '#111827', fontStyle: 'normal' }}>
                  DAKSHA IN ORBIT: A VR PLATFORM FOR SATELLITE EDUCATION AND OUTREACH
                </span>
              }
              hoverTitle="Daksha in Orbit"
              description="Designed and developed an immersive VR learning platform that enables intuitive exploration of satellite systems through spatial interactions, interactive 3D visualizations, and user-centered educational experiences for students and scientists. May 2026 • XR • Space Design"
              accentColor="#38bdf8"
              customContent={<DakshaGraphic />}
            />
          </Section>

          {/* 3. Visually Understanding Colour Space */}
          <Section>
            <Box
              as="a"
              href="https://bukil.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', cursor: 'pointer', textDecoration: 'none' }}
            >
              <ProjectPanel
                title="Visually understanding Colour space"
                hoverTitle="Visually understanding Colour space"
                description="Documentation is in progress"
                accentColor="purple.300"
                sx={{ position: 'relative', overflow: 'hidden' }}
                customContent={<MunselModel />}
              />
            </Box>
          </Section>

          {/* 4. Kode/Board */}
          <Section>
            <ProjectPanel
              title="Kode/Board"
              hoverTitle="Kode/Board"
              description="Here is a keyboard concept (kode board), Copy, paste, repeat... but not as you know it. Multi-layer clipboard on fingertips like seamlessly storing your snippets for instant recall."
              imageSrc="/images/works/BOTASF.png"
              imageAlt="Kode/Board"
              accentColor="green.400"
              onClick={onOpen}
            />
            <KodeboardModal isOpen={isOpen} onClose={onClose} />
          </Section>

          {/* 5. Human Factor in Design */}
          <Section>
            <NextLink href="/human-factor" passHref legacyBehavior>
              <Box as="a" style={{ display: 'block', cursor: 'pointer', textDecoration: 'none' }}>
                <ProjectPanel
                  title={
                    <span style={{ fontFamily: 'Michroma, monospace', letterSpacing: '0.12em', color: '#111827', fontStyle: 'normal' }}>
                      HUMAN FACTOR IN DESIGN
                    </span>
                  }
                  hoverTitle={
                    <span style={{ fontFamily: 'BaseNeueTrial, sans-serif', letterSpacing: 'normal', color: '#111827', fontStyle: 'italic' }}>
                      HUMAN FACTOR IN DESIGN
                    </span>
                  }
                  description={
                    <span style={{ color: '#4a5568' }}>
                      Investigating the Influence of Dark Patterns on User Behavior and Decision Making
                    </span>
                  }
                  accentColor="#0d9488"
                  customContent={
                    <div style={{ position: 'absolute', right: '6%', top: '50%', zIndex: 2, pointerEvents: 'none', transform: 'translateY(-50%)' }}>
                      <Image className="phone-large" src="/hfid/phone.svg" alt="phone" width="920px" height="auto" style={{ display: 'block' }} />
                    </div>
                  }
                />
              </Box>
            </NextLink>
          </Section>

          {/* 6. Design Evaluation ChatGPT */}
          <Section>
            <NextLink href="/design-evaluation" passHref legacyBehavior>
              <Box as="a" style={{ display: 'block', cursor: 'pointer', textDecoration: 'none' }}>
                <ProjectPanel
                  title="Design Evaluation ChatGPT"
                  hoverTitle="Design Evaluation ChatGPT"
                  description="A design evaluation of the ChatGPT Android client, analyzing its usability and interaction experience across real-world usage contexts."
                  accentColor="#232327"
                  customContent={<ChatGPT3DGraphic />}
                />
              </Box>
            </NextLink>
          </Section>

          {/* 7. Design System */}
          <Section>
            <NextLink href="/DS" passHref legacyBehavior>
              <Box as="a" style={{ display: 'block', cursor: 'pointer', textDecoration: 'none' }}>
                <ProjectPanel
                  title={
                    <span style={{ fontFamily: 'Michroma, monospace', letterSpacing: '0.12em', color: '#111827', fontStyle: 'normal' }}>
                      DESIGN SYSTEM
                    </span>
                  }
                  hoverTitle={
                    <span style={{ fontFamily: 'BaseNeueTrial, sans-serif', letterSpacing: 'normal', color: '#111827', fontStyle: 'italic' }}>
                      DESIGN SYSTEM
                    </span>
                  }
                  description={<span style={{ color: '#4a5568' }}>Design System For UPI</span>}
                  accentColor="#232327"
                  customContent={<DesignSystemGraphic />}
                  sx={{
                    filter: 'brightness(0.98) saturate(0.98)',
                  }}
                />
              </Box>
            </NextLink>
          </Section>
        </SimpleGrid>
      </Box>
      <ApplePasswordModal isOpen={isAppleOpen} onClose={onCloseApple} />
    </>
  )
}
