import React, { useRef, useEffect } from 'react'
import {
  Box,
  SimpleGrid,
  Image,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import NextLink from 'next/link'
import dynamic from 'next/dynamic'
import NextImage from 'next/image'
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
  rightText = 'Placeholder',
  hoverTitle: _hoverTitle,
  description: _description,
  imageSrc,
  imageAlt,
  gradientColors: _gradientColors,
  hoverGradientColors: _hoverGradientColors,
  accentColor: _accentColor,
  onClick,
  customContent,
  aspectRatio = '1 / 1',
  isSimpleTile: _isSimpleTile = false,
  titleColor,
  sx
}) => {
  return (
    <Box
      width="100%"
      maxW="100%"
      role="group"
      onClick={onClick}
      cursor={onClick ? 'pointer' : undefined}
    >
      {/* Title on left, placeholder on right outside the panel, very close to the panel */}
      {(title || (rightText ?? 'Placeholder')) && (
        <Box
          mb="6px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Text
            fontSize={{ base: '9.5px', md: '10.5px' }}
            fontFamily="'GT Walsheim', 'GT Walsheim Pro', -apple-system, BlinkMacSystemFont, sans-serif"
            fontWeight="700"
            letterSpacing="0.02em"
            color={titleColor || '#2f2f2f97'}
            lineHeight="1.2"
            textAlign="left"
          >
            {title}
          </Text>
          {(rightText ?? 'Placeholder') && (
            <Text
              fontSize={{ base: '9.5px', md: '10.5px' }}
              fontFamily="'GT Walsheim', 'GT Walsheim Pro', -apple-system, BlinkMacSystemFont, sans-serif"
              fontWeight="700"
              letterSpacing="0.02em"
              color={titleColor || '#2f2f2f97'}
              lineHeight="1.2"
              textAlign="right"
            >
              {rightText ?? 'Placeholder'}
            </Text>
          )}
        </Box>
      )}

      <Box
        position="relative"
        borderWidth="0.5px"
        borderColor="#1A1A1A"
        borderRadius={0}
        overflow="hidden"
        boxShadow="none"
        bg="transparent"
        transition="border-color 0.3s ease, box-shadow 0.3s ease"
        _hover={{
          bg: 'transparent',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
          borderColor: '#1A1A1A'
        }}
        _groupHover={{
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
          borderColor: '#1A1A1A'
        }}
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

        {imageSrc && (
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
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
          </Box>
        )}

        {customContent && (
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
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
        width={{ base: '92%', sm: '88%', md: '460px' }}
        maxW={{ base: '92%', md: '96%' }}
        position="relative"
        transform={{ base: 'translateY(0) scale(1.08)', md: 'translateY(-17px) scale(1.18)' }}
        transformOrigin="center center"
        transition="transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
        _groupHover={{
          transform: { base: 'translateY(0) scale(1.14)', md: 'translateY(-17px) scale(1.25)' }
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
      overflow="hidden"
    >
      {/* Daksha panel background image */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        overflow="hidden"
        sx={{
          '& img': {
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            objectFit: 'cover',
            objectPosition: 'center',
          }
        }}
        _groupHover={{
          '& img': { transform: 'scale(1.05)' }
        }}
      >
        <NextImage
          src="/images/Daksha.webp"
          alt="Daksha in Orbit"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </Box>

      {/* Hairline interactive Dish diagram in bottom-right corner */}
      <Box
        position="absolute"
        bottom={{ base: '6px', sm: '12px', md: '16px' }}
        right={{ base: '8px', sm: '16px', md: '22px' }}
        width={{ base: '140px', sm: '200px', md: '280px' }}
        maxWidth="42%"
        pointerEvents="auto"
        data-hairline=""
        sx={{
          '--hairline-plate': 'transparent',
          '--hairline-hi': '#ffffff',
          '--hairline-edge': '#e2e8f0',
          '--hairline-mid': '#94a3b8',
          '--hairline-lo': '#475569',
          '--hairline-stroke': '0.9',
        }}
        transition="transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
        _groupHover={{
          transform: 'scale(1.08)'
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
      {/* Next.js Image with fill — gets Vercel CDN optimization & proper cover */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        overflow="hidden"
        sx={{
          '& img': {
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            objectFit: 'cover',
            objectPosition: 'center',
          }
        }}
        _groupHover={{
          '& img': { transform: 'scale(1.06)' }
        }}
      >
        <NextImage
          src="/images/1016_opt.jpg"
          alt="macOS Wallpaper"
          fill
          priority
          unoptimized
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </Box>
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

// Hairline Tour Stops (ambient inspection loop when not hovered)
// Travels across knot quadrants, dwells to reveal magnified lines, then rests on plinth corner
const TOUR_STOPS = [
  { x: -36, y: -18, dwell: 1800, lift: 1 }, // West quadrant (left lobe)
  { x: 0, y: -28, dwell: 1800, lift: 1 },   // North quadrant (top lobe)
  { x: 36, y: -14, dwell: 1800, lift: 1 },   // East quadrant (right lobe)
  { x: 0, y: 22, dwell: 1800, lift: 1 },    // South quadrant (front lobe)
  { x: 42, y: 16, dwell: 2400, lift: 0 }    // Rest position on plinth
];

export function ChatGPT3DGraphic() {
  const gptPath =
    'M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z';

  const isoTransform = 'matrix(2.42487, 1.4, -2.42487, 1.4, 0, 0) translate(-12, -12)';
  const extrusionSteps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  const containerRef = useRef(null);
  const loupeRef = useRef(null);
  const magnifiedContentRef = useRef(null);
  const rimGroupRef = useRef(null);

  // Loupe rest position: rests near the lower-right area of the plinth, clear of the logo
  const REST_X = 42;
  const REST_Y = 16;

  // Hairline spring physics (matching @lucasmarkes/hairline spring dynamics)
  const springX = useRef({ x: REST_X, v: 0, t: REST_X, k: 90, c: 14 });
  const springY = useRef({ x: REST_Y, v: 0, t: REST_Y, k: 90, c: 14 });
  const springLift = useRef({ x: 0, v: 0, t: 0, k: 110, c: 16 });

  const isHovered = useRef(false);
  const tourIndex = useRef(TOUR_STOPS.length - 1); // Start at rest stop
  const tourTimeoutRef = useRef(null);

  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(null);

  useEffect(() => {
    const isSpringActive = (sp) => Math.abs(sp.x - sp.t) > 0.005 || Math.abs(sp.v) > 0.05;

    const stepSpring = (sp, dt) => {
      if (!Number.isFinite(sp.x)) sp.x = 0;
      if (!Number.isFinite(sp.v)) sp.v = 0;
      if (!Number.isFinite(sp.t)) sp.t = 0;
      if (Number.isFinite(dt) && dt > 0) {
        const n = Math.max(1, Math.min(20, Math.ceil(dt * 240)));
        const h = dt / n;
        for (let i = 0; i < n; i++) {
          const a = -sp.k * (sp.x - sp.t) - sp.c * sp.v;
          sp.v += a * h;
          sp.x += sp.v * h;
        }
      }
      return isSpringActive(sp);
    };

    const render = (time) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time;
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = time;

      const activeX = stepSpring(springX.current, dt);
      const activeY = stepSpring(springY.current, dt);
      const activeLift = stepSpring(springLift.current, dt);

      const x = Number.isFinite(springX.current.x) ? springX.current.x : REST_X;
      const y = Number.isFinite(springY.current.x) ? springY.current.x : REST_Y;
      const rawLift = Number.isFinite(springLift.current.x) ? springLift.current.x : 0;
      const liftProgress = Math.max(0, Math.min(1.5, rawLift));

      // Lens elevation above floor (28px rest -> 34px hover lift)
      const liftZ = 28 + 6 * liftProgress;

      // Update Loupe position
      if (loupeRef.current) {
        loupeRef.current.setAttribute('transform', `translate(${270 + x}, ${114 + y})`);
      }

      // Update Rim and Glass elevation inside the Loupe group
      if (rimGroupRef.current) {
        rimGroupRef.current.setAttribute('transform', `translate(0, ${-liftZ})`);
      }

      // Update Magnified Content under the lens
      if (magnifiedContentRef.current) {
        const mag = 1.35;
        magnifiedContentRef.current.setAttribute(
          'transform',
          `scale(${mag}) translate(${-270 - x}, ${-114 - y})`
        );
      }

      if (activeX || activeY || activeLift) {
        animFrameRef.current = requestAnimationFrame(render);
      } else {
        animFrameRef.current = null;
        lastTimeRef.current = null;
      }
    };

    const wake = () => {
      if (!animFrameRef.current) {
        lastTimeRef.current = null;
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    // Ambient automatic tour runner (Hairline original behavior when not hovered)
    const advanceTour = () => {
      if (isHovered.current) return;
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }
      tourIndex.current = (tourIndex.current + 1) % TOUR_STOPS.length;
      const stop = TOUR_STOPS[tourIndex.current];
      springX.current.t = stop.x;
      springY.current.t = stop.y;
      springLift.current.t = stop.lift;
      wake();
      tourTimeoutRef.current = setTimeout(advanceTour, stop.dwell);
    };

    const container = containerRef.current;
    if (!container) return;

    const onPointerMove = (e) => {
      if (tourTimeoutRef.current) clearTimeout(tourTimeoutRef.current);
      isHovered.current = true;

      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const nx = Math.max(-0.5, Math.min(0.5, (e.clientX - rect.left) / rect.width - 0.5));
      const ny = Math.max(-0.5, Math.min(0.5, (e.clientY - rect.top) / rect.height - 0.5));

      let tx = nx * 105;
      let ty = ny * 62;

      // Isometric boundary clamping: stay inside rounded base plinth
      const rho = Math.abs(tx) / 106 + Math.abs(ty) / 63;
      if (rho > 0.60 && rho > 0.0001) {
        const scaleClamp = 0.60 / rho;
        tx *= scaleClamp;
        ty *= scaleClamp;
      }

      if (Number.isFinite(tx) && Number.isFinite(ty)) {
        springX.current.t = tx;
        springY.current.t = ty;
        springLift.current.t = 1;
        wake();
      }
    };

    const onPointerEnter = () => {
      if (tourTimeoutRef.current) clearTimeout(tourTimeoutRef.current);
      isHovered.current = true;
      springLift.current.t = 1;
      wake();
    };

    const onPointerLeave = () => {
      isHovered.current = false;
      springX.current.t = REST_X;
      springY.current.t = REST_Y;
      springLift.current.t = 0;
      wake();

      // Reset to rest index and schedule tour resumption after RESUME delay
      tourIndex.current = TOUR_STOPS.length - 1;
      if (tourTimeoutRef.current) clearTimeout(tourTimeoutRef.current);
      tourTimeoutRef.current = setTimeout(advanceTour, 1800);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        if (tourTimeoutRef.current) clearTimeout(tourTimeoutRef.current);
      } else if (!isHovered.current) {
        if (tourTimeoutRef.current) clearTimeout(tourTimeoutRef.current);
        tourTimeoutRef.current = setTimeout(advanceTour, 1200);
      }
    };

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerenter', onPointerEnter);
    container.addEventListener('pointerleave', onPointerLeave);
    container.addEventListener('pointercancel', onPointerLeave);
    container.addEventListener('pointerup', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Initial wake & schedule start of automatic ambient inspection loop
    wake();
    tourTimeoutRef.current = setTimeout(advanceTour, 1400);

    return () => {
      if (tourTimeoutRef.current) clearTimeout(tourTimeoutRef.current);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerenter', onPointerEnter);
      container.removeEventListener('pointerleave', onPointerLeave);
      container.removeEventListener('pointercancel', onPointerLeave);
      container.removeEventListener('pointerup', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <Box
      ref={containerRef}
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      pointerEvents="auto"
      touchAction="pan-y"
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
        '--hairline-stroke': '0.25',
        '& svg': {
          width: '100%',
          height: '100%',
          display: 'block'
        },
        '& path, & polygon, & line, & circle, & rect': {
          vectorEffect: 'non-scaling-stroke',
          strokeLinejoin: 'round',
          strokeLinecap: 'round'
        },
        '& .hl-outline': {
          strokeWidth: '0.25px !important'
        },
        '& .hl-grid-line': {
          strokeWidth: '0.18px !important'
        },
        '& .hl-top-face': {
          strokeWidth: '0.25px !important',
          stroke: '#a4a4ac !important'
        },
        '& .hl-slice': {
          strokeWidth: '0.22px !important'
        }
      }}
    >
      <svg
        viewBox="0 0 540 464"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <defs>
          <clipPath id="chatgpt-rounded-base">
            <rect x="0" y="0" width="100" height="100" rx="10" ry="10" />
          </clipPath>

          <clipPath id="chatgpt-loupe-glass">
            <ellipse cx="0" cy="0" rx="40" ry="23.1" />
          </clipPath>

          {/* Reusable Stationary Artwork: Base plinth + Stationary ChatGPT Logo Stack as before */}
          <g id="chatgpt-stationary-artwork">
            <g id="isometric-plinth">
              {/* Front skirt/thickness of rounded plinth (ultra-thin stroke) */}
              <path
                className="hl-outline"
                d="M153.26,114 L153.6,115.96 L154.6,117.84 L156.22,119.58 L158.4,121.1 L257.6,177.9 L260.26,179.15 L263.29,180.08 L266.58,180.65 L270,180.84 L273.42,180.65 L276.71,180.08 L279.74,179.15 L282.4,177.9 L381.6,121.1 L383.78,119.58 L385.4,117.84 L386.4,115.96 L386.74,114 L386.74,122 L386.4,123.96 L385.4,125.84 L383.78,127.58 L381.6,129.1 L282.4,185.9 L279.74,187.15 L276.71,188.08 L273.42,188.65 L270,188.84 L266.58,188.65 L263.29,188.08 L260.26,187.15 L257.6,185.9 L158.4,129.1 L156.22,127.58 L154.6,125.84 L153.6,123.96 L153.26,122 Z"
                fill="#ffffff"
                style={{ fill: '#ffffff', strokeWidth: '0.25px' }}
                stroke="#a4a4ac"
                strokeWidth="0.25"
              />

              {/* Top rounded plate with image, ultra-thin dashed grid lines, and ultra-thin hairline outline */}
              <g transform="matrix(1.24, 0.71, -1.24, 0.71, 270, 43)">
                <g clipPath="url(#chatgpt-rounded-base)">
                  <image
                    href="/images/chatgpt-base.jpg"
                    x="0"
                    y="0"
                    width="100"
                    height="100"
                    preserveAspectRatio="none"
                  />
                  <g stroke="rgba(255, 255, 255, 0.7)" strokeWidth="0.18" strokeDasharray="1.5 3">
                    <line className="hl-grid-line" style={{ strokeWidth: '0.18px' }} x1="0" y1="25" x2="100" y2="25" />
                    <line className="hl-grid-line" style={{ strokeWidth: '0.18px' }} x1="0" y1="50" x2="100" y2="50" />
                    <line className="hl-grid-line" style={{ strokeWidth: '0.18px' }} x1="0" y1="75" x2="100" y2="75" />
                    <line className="hl-grid-line" style={{ strokeWidth: '0.18px' }} x1="25" y1="0" x2="25" y2="100" />
                    <line className="hl-grid-line" style={{ strokeWidth: '0.18px' }} x1="50" y1="0" x2="50" y2="100" />
                    <line className="hl-grid-line" style={{ strokeWidth: '0.18px' }} x1="75" y1="0" x2="75" y2="100" />
                  </g>
                </g>
                <rect
                  className="hl-outline"
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                  rx="10"
                  ry="10"
                  fill="none"
                  style={{ fill: 'none', strokeWidth: '0.25px' }}
                  stroke="#232327"
                  strokeWidth="0.25"
                />
              </g>
            </g>


            {/* Ultra-thin & stacked 3D ChatGPT Logo Knot as before */}
            <g id="chatgpt-isometric-body" transform="translate(270, 98)">
              {/* Volumetric Extrusion Slices (Crisp ultra-thin hairline stacked layers) */}
              {extrusionSteps.map((step) => (
                <g key={step} transform={`translate(0, ${-(step - 1)})`}>
                  <path
                    className="hl-slice"
                    d={gptPath}
                    transform={isoTransform}
                    fill="#ffffff"
                    style={{ fill: '#ffffff', strokeWidth: '0.22px' }}
                    stroke={step === 1 ? '#a4a4ac' : '#c3c3c9'}
                    strokeWidth="0.22"
                  />
                </g>
              ))}

              {/* Primary Top Isometric Face (Ultra-thin crisp grey hairline contour) */}
              <g transform="translate(0, -14)">
                <path
                  className="hl-top-face"
                  d={gptPath}
                  transform={isoTransform}
                  fill="#ffffff"
                  style={{ fill: '#ffffff', strokeWidth: '0.25px', stroke: '#a4a4ac' }}
                  stroke="#a4a4ac"
                  strokeWidth="0.25"
                />
                <polygon
                  points="-3,-1 0,1 3,-1 3,-3 0,-1 -3,-3"
                  fill="#a4a4ac"
                  style={{ fill: '#a4a4ac' }}
                  opacity="0.35"
                />
              </g>
            </g>
          </g>
        </defs>

        <g id="chatgpt-scaled-complex" transform="translate(270, 232) scale(1.50) translate(-270, -114)">
          {/* Normal scale stationary scene: base plate + logo as before */}
          <use href="#chatgpt-stationary-artwork" />

          {/* Interactive Floating Magnifying Lens without legs */}
          <g ref={loupeRef} transform={`translate(${270 + REST_X}, ${114 + REST_Y})`}>
            {/* Soft floating shadow below lens */}
            <ellipse
              cx="0"
              cy="6"
              rx="38"
              ry="22"
              fill="rgba(0, 0, 0, 0.08)"
              style={{ fill: 'rgba(0, 0, 0, 0.08)' }}
              stroke="none"
            />

            {/* Elevated cylindrical rim & optical glass */}
            <g ref={rimGroupRef} transform="translate(0, -28)">
              {/* Magnified view through glass */}
              <g clipPath="url(#chatgpt-loupe-glass)">
                <ellipse cx="0" cy="0" rx="40" ry="23.1" fill="rgba(255, 255, 255, 0.12)" style={{ fill: 'rgba(255, 255, 255, 0.12)' }} />
                <g ref={magnifiedContentRef}>
                  <use href="#chatgpt-stationary-artwork" />
                </g>
              </g>

              {/* Cylindrical Rim: skirt, top face, and inner bevel crease (thin lines) */}
              <path
                d="M -44 0 A 44 25.4 0 0 0 44 0 L 44 2.8 A 44 25.4 0 0 1 -44 2.8 Z"
                fill="#ffffff"
                style={{ fill: '#ffffff', strokeWidth: '0.3px' }}
                stroke="#232327"
                strokeWidth="0.3"
              />
              <ellipse
                cx="0"
                cy="0"
                rx="44"
                ry="25.4"
                fill="none"
                style={{ fill: 'none', strokeWidth: '0.3px' }}
                stroke="#232327"
                strokeWidth="0.3"
              />
              <ellipse
                cx="0"
                cy="0"
                rx="40"
                ry="23.1"
                fill="none"
                style={{ fill: 'none', strokeWidth: '0.25px' }}
                stroke="#a4a4ac"
                strokeWidth="0.25"
              />

              {/* Glint shine highlight arc on glass */}
              <path
                d="M -34 -6 A 38 21.9 0 0 1 20 -18"
                fill="none"
                style={{ fill: 'none', strokeWidth: '0.3px' }}
                stroke="rgba(255, 255, 255, 0.95)"
                strokeWidth="0.3"
                strokeDasharray="10 24"
              />
            </g>
          </g>
        </g>
      </svg>
    </Box>
  );
}

// Preserved custom SVG isometric graphic (disabled)
export function ChatGPTCustomSVGGraphic() {
  const gptPath =
    'M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z';

  const isoTransform = 'matrix(2.42487, 1.4, -2.42487, 1.4, 0, 0) translate(-12, -12)';
  const extrusionSteps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  const containerRef = useRef(null);
  const knotBodyRef = useRef(null);
  const footprintRef = useRef(null);
  const guidesRef = useRef(null);
  const slicesRef = useRef([]);
  const topFaceRef = useRef(null);

  // Hairline spring physics (matching @lucasmarkes/hairline spring dynamics)
  const springX = useRef({ x: 0, v: 0, t: 0, k: 90, c: 14 });
  const springY = useRef({ x: 0, v: 0, t: 0, k: 90, c: 14 });
  const springLift = useRef({ x: 0, v: 0, t: 0, k: 110, c: 16 });

  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(null);

  useEffect(() => {
    const isSpringActive = (sp) => Math.abs(sp.x - sp.t) > 0.005 || Math.abs(sp.v) > 0.05;

    const stepSpring = (sp, dt) => {
      if (!Number.isFinite(sp.x)) sp.x = 0;
      if (!Number.isFinite(sp.v)) sp.v = 0;
      if (!Number.isFinite(sp.t)) sp.t = 0;
      if (Number.isFinite(dt) && dt > 0) {
        const n = Math.max(1, Math.min(20, Math.ceil(dt * 240)));
        const h = dt / n;
        for (let i = 0; i < n; i++) {
          const a = -sp.k * (sp.x - sp.t) - sp.c * sp.v;
          sp.v += a * h;
          sp.x += sp.v * h;
        }
      }
      return isSpringActive(sp);
    };

    const render = (time) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time;
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = time;

      const activeX = stepSpring(springX.current, dt);
      const activeY = stepSpring(springY.current, dt);
      const activeLift = stepSpring(springLift.current, dt);

      const x = Number.isFinite(springX.current.x) ? springX.current.x : 0;
      const y = Number.isFinite(springY.current.y) ? springY.current.y : 0;
      const rawLift = Number.isFinite(springLift.current.x) ? springLift.current.x : 0;
      const liftProgress = Math.max(0, Math.min(1.5, rawLift)); // 0 (rest) to 1 (hovered zoom)

      // Zoom lens interaction dynamics:
      // 1. Knot elevation lifts along vertical Z axis (16px rest -> 34px zoom)
      const liftZ = 16 + 18 * liftProgress;
      // 2. Optical magnification scale (1.0 rest -> 1.14 zoom)
      const scale = 1.0 + 0.14 * liftProgress;
      // 3. Extrusion barrel telescoping spread (1.0 rest -> 1.35 zoom barrel expansion)
      const sliceSpread = 1.0 + 0.35 * liftProgress;

      // Update moving ground footprint shadow directly underneath the lens
      if (footprintRef.current) {
        footprintRef.current.setAttribute('transform', `translate(${270 + x}, ${114 + y})`);
        footprintRef.current.style.opacity = Math.max(0.4, 0.75 - 0.25 * liftProgress).toFixed(3);
      }

      // Update 3D floating knot position & magnification
      if (knotBodyRef.current) {
        knotBodyRef.current.setAttribute(
          'transform',
          `translate(${270 + x}, ${114 + y - liftZ}) scale(${scale})`
        );
      }

      // Update telescoping extrusion stack
      slicesRef.current.forEach((el, idx) => {
        if (el) {
          const step = idx + 1;
          el.setAttribute('transform', `translate(0, ${-step * sliceSpread})`);
        }
      });

      if (topFaceRef.current) {
        topFaceRef.current.setAttribute('transform', `translate(0, ${-15 * sliceSpread})`);
      }

      // Update vertical drop projection guides (connecting elevated knot vertices to floor footprint)
      if (guidesRef.current) {
        const lines = guidesRef.current.querySelectorAll('line');
        const dropPoints = [
          [0, 0],
          [-50, 0],
          [50, 0],
          [-25, -14],
          [25, -14],
          [0, -28]
        ];

        lines.forEach((line, i) => {
          if (dropPoints[i]) {
            const [rx, ry] = dropPoints[i];
            const fx = 270 + x + rx;
            const fy = 114 + y + ry;
            line.setAttribute('x1', String(fx));
            line.setAttribute('y1', String(fy - liftZ));
            line.setAttribute('x2', String(fx));
            line.setAttribute('y2', String(fy));
          }
        });
      }

      // Continue spring loop while moving
      if (activeX || activeY || activeLift) {
        animFrameRef.current = requestAnimationFrame(render);
      } else {
        animFrameRef.current = null;
        lastTimeRef.current = null;
      }
    };

    const wake = () => {
      if (!animFrameRef.current) {
        lastTimeRef.current = null;
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    const container = containerRef.current;
    if (!container) return;

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const nx = Math.max(-0.5, Math.min(0.5, (e.clientX - rect.left) / rect.width - 0.5));
      const ny = Math.max(-0.5, Math.min(0.5, (e.clientY - rect.top) / rect.height - 0.5));

      let tx = nx * 115;
      let ty = ny * 68;

      // Isometric boundary clamping: stay inside rounded base plinth
      const rho = Math.abs(tx) / 116 + Math.abs(ty) / 67;
      if (rho > 0.60 && rho > 0.0001) {
        const scaleClamp = 0.60 / rho;
        tx *= scaleClamp;
        ty *= scaleClamp;
      }

      if (Number.isFinite(tx) && Number.isFinite(ty)) {
        springX.current.t = tx;
        springY.current.t = ty;
        springLift.current.t = 1;
        wake();
      }
    };

    const onPointerEnter = () => {
      springLift.current.t = 1; // Trigger zoom lens lift & extension immediately on hover
      wake();
    };

    const onPointerLeave = () => {
      springX.current.t = 0; // Return smoothly to center on rest
      springY.current.t = 0;
      springLift.current.t = 0; // Settle back down
      wake();
    };

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerenter', onPointerEnter);
    container.addEventListener('pointerleave', onPointerLeave);
    container.addEventListener('pointercancel', onPointerLeave);
    container.addEventListener('pointerup', onPointerLeave);

    return () => {
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerenter', onPointerEnter);
      container.removeEventListener('pointerleave', onPointerLeave);
      container.removeEventListener('pointercancel', onPointerLeave);
      container.removeEventListener('pointerup', onPointerLeave);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <Box
      ref={containerRef}
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      pointerEvents="auto"
      touchAction="pan-y"
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
        '& path, & polygon, & line, & circle, & rect': {
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
        <defs>
          <clipPath id="chatgpt-rounded-base">
            <rect x="0" y="0" width="100" height="100" rx="10" ry="10" />
          </clipPath>
        </defs>
        <g id="chatgpt-scaled-complex" transform="translate(270, 232) scale(1.50) translate(-270, -114)">
          <g id="isometric-plinth">
            {/* Front skirt/thickness of rounded plinth */}
            <path
              d="M153.26,114 L153.6,115.96 L154.6,117.84 L156.22,119.58 L158.4,121.1 L257.6,177.9 L260.26,179.15 L263.29,180.08 L266.58,180.65 L270,180.84 L273.42,180.65 L276.71,180.08 L279.74,179.15 L282.4,177.9 L381.6,121.1 L383.78,119.58 L385.4,117.84 L386.4,115.96 L386.74,114 L386.74,122 L386.4,123.96 L385.4,125.84 L383.78,127.58 L381.6,129.1 L282.4,185.9 L279.74,187.15 L276.71,188.08 L273.42,188.65 L270,188.84 L266.58,188.65 L263.29,188.08 L260.26,187.15 L257.6,185.9 L158.4,129.1 L156.22,127.58 L154.6,125.84 L153.6,123.96 L153.26,122 Z"
              fill="#ffffff"
              stroke="#a4a4ac"
              strokeWidth="0.9"
            />

            {/* Top rounded plate with image, grid lines, and hairline perimeter */}
            <g transform="matrix(1.24, 0.71, -1.24, 0.71, 270, 43)">
              <g clipPath="url(#chatgpt-rounded-base)">
                <image
                  href="/images/chatgpt-base.jpg"
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                  preserveAspectRatio="none"
                />
                <g stroke="rgba(255, 255, 255, 0.55)" strokeWidth="0.8" strokeDasharray="2 4">
                  <line x1="0" y1="25" x2="100" y2="25" />
                  <line x1="0" y1="50" x2="100" y2="50" />
                  <line x1="0" y1="75" x2="100" y2="75" />
                  <line x1="25" y1="0" x2="25" y2="100" />
                  <line x1="50" y1="0" x2="50" y2="100" />
                  <line x1="75" y1="0" x2="75" y2="100" />
                </g>
              </g>
              <rect
                x="0"
                y="0"
                width="100"
                height="100"
                rx="10"
                ry="10"
                fill="none"
                style={{ fill: 'none' }}
                stroke="#232327"
                strokeWidth="0.9"
              />
            </g>
          </g>

          {/* Floor Footprint Shadow: Glides across plate under the zoom lens */}
          <g ref={footprintRef} transform="translate(270, 114)">
            <path
              d={gptPath}
              transform={isoTransform}
              fill="none"
              stroke="rgba(255, 255, 255, 0.65)"
              strokeWidth="0.85"
              strokeDasharray="2 3"
            />
          </g>

          {/* Vertical projection drop guide lines connecting floating knot to floor footprint */}
          <g ref={guidesRef} stroke="rgba(0, 0, 0, 0.28)" strokeWidth="0.8" strokeDasharray="1 3">
            <line x1="270" y1="98" x2="270" y2="114" />
            <line x1="220" y1="98" x2="220" y2="114" />
            <line x1="320" y1="98" x2="320" y2="114" />
            <line x1="245" y1="84" x2="245" y2="100" />
            <line x1="295" y1="84" x2="295" y2="100" />
            <line x1="270" y1="70" x2="270" y2="86" />
          </g>

          {/* 3D Floating Zoom Lens Logo Stack: Follows pointer & magnifies/telescopes */}
          <g
            ref={knotBodyRef}
            id="chatgpt-isometric-body"
            className="hairline-interactive-knot"
            transform="translate(270, 98) scale(1.0)"
          >
            {/* Telescoping volumetric extrusion barrel slices */}
            {extrusionSteps.map((step, idx) => (
              <g
                key={step}
                ref={(el) => {
                  slicesRef.current[idx] = el;
                }}
                transform={`translate(0, ${-step})`}
              >
                <path
                  d={gptPath}
                  transform={isoTransform}
                  fill="#ffffff"
                  stroke={step === 1 ? '#a4a4ac' : '#c3c3c9'}
                  strokeWidth="0.9"
                />
              </g>
            ))}

            {/* Lit Top Face of Zoom Lens Stack */}
            <g
              ref={topFaceRef}
              transform="translate(0, -15)"
            >
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
              {/* Aperture depth drop */}
              <polygon
                points="-3,-1 0,1 3,-1 3,-3 0,-1 -3,-3"
                fill="#232327"
                opacity="0.25"
              />
              {/* Zoom lens optical curvature glare */}
              <ellipse
                cx="-4"
                cy="-6"
                rx="16"
                ry="8"
                transform="rotate(-25)"
                fill="none"
                stroke="rgba(255, 255, 255, 0.75)"
                strokeWidth="0.8"
                strokeDasharray="6 14"
                opacity={0.85}
              />
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
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: '20px', md: '24px' }}>
          {/* 1. Intelligent Design System Architecture for Apple HIG (Wide Simple Tile) */}
          <Section gridColumn={{ base: 'span 1', md: 'span 2' }}>
            <ProjectPanel
              title="Intelligent Design System Architecture for Apple HIGs"
              rightText="AI Design System • AI Governance • Generative AI • Guardrails & Defensive UX • Interaction Design • RAG System"
              aspectRatio={{ base: '1 / 1', sm: '16 / 9', md: '2.1 / 1' }}
              customContent={<AppleHIGGraphic />}
              onClick={onOpenApple}
            />
          </Section>

          {/* 2. Daksha in Orbit */}
          <Section gridColumn={{ base: 'span 1', md: 'span 2' }}>
            <ProjectPanel
              title="Daksha in Orbit"
              rightText="Mixed Reality • Interaction Design • Astronomy Education • Outreach"
              aspectRatio={{ base: '1 / 1', sm: '16 / 9', md: '2.1 / 1' }}
              accentColor="#38bdf8"
              customContent={<DakshaGraphic />}
            />
          </Section>

          {/* 3. Visually Understanding Colour Space */}
          <Section gridColumn={{ base: 'span 1', md: 'span 2' }}>
            <Box
              as="a"
              href="https://bukil.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', cursor: 'pointer', textDecoration: 'none' }}
            >
              <ProjectPanel
                title="Colour Space"
                rightText="Colour Geometry • Interaction Design • Data Visualisation • Design Education"
                aspectRatio={{ base: '1 / 1', sm: '16 / 9', md: '2.1 / 1' }}
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
              rightText="Accessibility • Tangible Interaction"
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
                  title="Human Factor in Design"
                  rightText="Product Evaluation • Quanlitative Analysis"
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
                  rightText="AI Evaluation • AI Governance"
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
                  title="Design System for UPI"
                  rightText="Design System • Documentation • Encapsulation"
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
