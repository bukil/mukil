import { Heading, Text, VStack, Icon, Box, useColorModeValue, Image, Icon as ChakraIcon } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { FiBook, FiCamera, FiEdit } from 'react-icons/fi'
import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import axios from 'axios'
import { FaPlayCircle } from 'react-icons/fa'
import NextLink from 'next/link'


const Blog = () => {
  const textColor = useColorModeValue('#222', '#fff')
  const greenLine = useColorModeValue('#89EF8C', '#89EF8C')
  const pinkLine = useColorModeValue('#b83280', '#ff7eb3')
  const blueLine = useColorModeValue('#3182ce', '#63b3ed')
  const yellowLine = useColorModeValue('#FFD600', '#FFD600')

  // Refs for GSAP animation
  const blogBoxRef = useRef(null)
  const bookBoxRef = useRef(null)
  const photoBoxRef = useRef(null)
  const nasaCardRef = useRef(null)
  const canvasRef = useRef(null)

  // GSAP animation handlers
  const handleBoxEnter = ref => {
    if (ref.current) {
      gsap.to(ref.current, {
        scale: 1.035,
        y: -8,
        boxShadow: '0 8px 32px 0 rgba(137,239,140,0.15)',
        duration: 0.35,
        ease: 'power3.out',
      })
    }
  }
  const handleBoxLeave = ref => {
    if (ref.current) {
      gsap.to(ref.current, {
        scale: 1,
        y: 0,
        boxShadow: 'none',
        duration: 0.35,
        ease: 'power3.in',
      })
    }
  }

  // --- NASA APOD Fact ---
  const [apod, setApod] = useState(null)
  const [apodLoading, setApodLoading] = useState(true)
  const [apodError, setApodError] = useState(null)

  // NASA APOD fetch with retry and cache
  const fetchAPOD = async (retry = 0) => {
    setApodLoading(true)
    setApodError(null)
    try {
      const res = await axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
      setApod(res.data)
      localStorage.setItem('apodCache', JSON.stringify(res.data))
    } catch (err) {
      if (retry < 2) {
        await sleep(1200)
        fetchAPOD(retry + 1)
        return
      }
      // Try to show cached fact if available
      const cached = localStorage.getItem('apodCache')
      if (cached) {
        setApod(JSON.parse(cached))
        setApodError('Could not fetch new NASA fact. Showing last cached fact.')
      } else {
        setApodError('Could not fetch NASA fact. Try again later.')
      }
    } finally {
      setApodLoading(false)
    }
  }

  useEffect(() => {
    fetchAPOD()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // GSAP entrance animation for the NASA card
  useEffect(() => {
    if (nasaCardRef.current && !apodLoading) {
      gsap.fromTo(
        nasaCardRef.current,
        { y: 40, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
      )
    }
  }, [apodLoading])

  // Solar system orbits and planets animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;
    function setCanvasSize() {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
    setCanvasSize();

    // Make orbits and planets much larger
    const orbits = [
      { rx: width * 0.15, ry: height * 0.04, color: 'rgba(137,239,140,0.18)' },
      { rx: width * 0.22, ry: height * 0.08, color: 'rgba(137,239,140,0.13)' },
      { rx: width * 0.29, ry: height * 0.12, color: 'rgba(137,239,140,0.10)' },
      { rx: width * 0.36, ry: height * 0.16, color: 'rgba(137,239,140,0.08)' },
      { rx: width * 0.43, ry: height * 0.20, color: 'rgba(137,239,140,0.06)' },
      { rx: width * 0.50, ry: height * 0.24, color: 'rgba(137,239,140,0.04)' },
      { rx: width * 0.57, ry: height * 0.28, color: 'rgba(137,239,140,0.03)' },
      { rx: width * 0.64, ry: height * 0.32, color: 'rgba(137,239,140,0.02)' },
      { rx: width * 0.71, ry: height * 0.36, color: 'rgba(137,239,140,0.01)' },
      { rx: width * 0.78, ry: height * 0.40, color: 'rgba(137,239,140,0.01)' },
      { rx: width * 0.85, ry: height * 0.44, color: 'rgba(137,239,140,0.01)' },
    ];
    const planets = [
      { orbit: 0, r: 18, color: '#89EF8C', speed: 0.025, phase: 0 },
      { orbit: 1, r: 12, color: '#b3ffb3', speed: -0.018, phase: 1.2 },
      { orbit: 2, r: 24, color: '#7fffbe', speed: 0.015, phase: 2.4 },
      { orbit: 3, r: 10, color: '#fff', speed: -0.028, phase: 0.7 },
      { orbit: 4, r: 16, color: '#ffb3b3', speed: 0.012, phase: 1.5 },
      { orbit: 5, r: 14, color: '#b3b3ff', speed: -0.015, phase: 2.1 },
      { orbit: 6, r: 20, color: '#ffd6b3', speed: 0.010, phase: 0.3 },
      { orbit: 7, r: 22, color: '#d6b3ff', speed: -0.008, phase: 1.8 },
      { orbit: 8, r: 15, color: '#b3ffd6', speed: 0.006, phase: 0.5 },
      { orbit: 9, r: 19, color: '#ffb3d6', speed: -0.004, phase: 2.2 },
      { orbit: 10, r: 17, color: '#d6ffb3', speed: 0.003, phase: 1.0 },
    ];

    const planetNames = ['242246', '242244', '242240', '242241', '242252', '242251', '242250', '242249', '242248', '242247', '242245']; // order: inner to outer

    // Twinkling starfield
    const STAR_COUNT = 60;
    const stars = Array.from({ length: STAR_COUNT }).map(() => {
      let rand = Math.random();
      let r = 0.5 + Math.pow(rand, 2.5) * 2.7;
      let type = Math.random() < 0.25 ? 'plus' : 'circle';
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r,
        type,
        baseAlpha: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
      };
    });

    // Mouse interaction for stars
    let mouse = { x: -1000, y: -1000 };
    let lastMouseMove = 0;
    function handleMouseMove(e) {
      const now = performance.now();
      if (now - lastMouseMove > 16) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        lastMouseMove = now;
      }
    }
    window.addEventListener('mousemove', handleMouseMove);

    let frame = 0;
    let lastFrameTime = 0;
    let animId;
    function animate(currentTime) {
      if (currentTime - lastFrameTime < 16) {
        animId = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = currentTime;

      ctx.clearRect(0, 0, width, height);
      
      // Draw twinkling stars
      for (const star of stars) {
        const twinkle = Math.sin(frame * star.twinkleSpeed + star.twinklePhase) * 0.5 + 0.5;
        let alpha = star.baseAlpha * (0.7 + 0.6 * twinkle);
        
        const dx = star.x - mouse.x;
        const dy = star.y - mouse.y;
        const distSquared = dx * dx + dy * dy;
        if (distSquared < 6400) {
          alpha = 1.0;
        } else if (distSquared < 32400) {
          alpha = Math.max(alpha, 0.7);
        }

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.shadowColor = '#b3d1ff';
        ctx.shadowBlur = 8;
        if (star.type === 'plus') {
          ctx.strokeStyle = 'white';
          ctx.lineWidth = Math.max(1, star.r * 0.7);
          ctx.beginPath();
          ctx.moveTo(star.x - star.r, star.y);
          ctx.lineTo(star.x + star.r, star.y);
          ctx.moveTo(star.x, star.y - star.r);
          ctx.lineTo(star.x, star.y + star.r);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
          ctx.fillStyle = 'white';
          ctx.fill();
        }
        ctx.restore();
      }

      const cx = width / 2;
      const cy = height / 2 + height * 0.08;

      for (let i = 0; i < orbits.length; i++) {
        const orbit = orbits[i];
        const axis = (i === orbits.length - 1) ? Math.PI / 8 : Math.PI / 12;
        
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(cx, cy, orbit.rx, orbit.ry, axis, 0, Math.PI * 2);
        ctx.strokeStyle = orbit.color;
        ctx.lineWidth = 2;
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.stroke();
        ctx.restore();

        const planet = planets.find(p => p.orbit === i);
        if (planet) {
          const t = frame * planet.speed + planet.phase;
          const arcLength = 0.36;
          const arcStart = t - arcLength / 2;
          const arcEnd = t + arcLength / 2;

          ctx.save();
          ctx.beginPath();
          ctx.ellipse(cx, cy, orbit.rx, orbit.ry, axis, arcStart, arcEnd);
          const grad = ctx.createLinearGradient(
            cx + orbit.rx * Math.cos(arcStart) * Math.cos(axis) - orbit.ry * Math.sin(arcStart) * Math.sin(axis),
            cy + orbit.rx * Math.cos(arcStart) * Math.sin(axis) + orbit.ry * Math.sin(arcStart) * Math.cos(axis),
            cx + orbit.rx * Math.cos(arcEnd) * Math.cos(axis) - orbit.ry * Math.sin(arcEnd) * Math.sin(axis),
            cy + orbit.rx * Math.cos(arcEnd) * Math.sin(axis) + orbit.ry * Math.sin(arcEnd) * Math.cos(axis)
          );
          grad.addColorStop(0, 'rgba(137,239,140,0.0)');
          grad.addColorStop(0.5, hexToRgba(planet.color, 0.8));
          grad.addColorStop(1, 'rgba(137,239,140,0.0)');
          ctx.strokeStyle = grad;
          ctx.lineWidth = 8;
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 0.85;
          ctx.stroke();
          ctx.restore();

          const cosA = Math.cos(axis);
          const sinA = Math.sin(axis);
          const px = cx + orbit.rx * Math.cos(t) * cosA - orbit.ry * Math.sin(t) * sinA;
          const py = cy + orbit.rx * Math.cos(t) * sinA + orbit.ry * Math.sin(t) * cosA;
          
          ctx.save();
          ctx.beginPath();
          ctx.arc(px, py, planet.r, 0, Math.PI * 2);
          ctx.fillStyle = planet.color;
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 0.85;
          ctx.fill();
          ctx.restore();

          ctx.save();
          ctx.font = `bold ${Math.max(planet.r * 1.2, 14)}px 'Space Mono', monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.globalAlpha = 0.85;
          ctx.fillStyle = '#b3d1ff';
          const labelOffset = planet.r + 18;
          const labelX = cx + (orbit.rx + labelOffset) * Math.cos(t) * cosA - (orbit.ry + labelOffset) * Math.sin(t) * sinA;
          const labelY = cy + (orbit.rx + labelOffset) * Math.cos(t) * sinA + (orbit.ry + labelOffset) * Math.sin(t) * cosA;
          ctx.strokeStyle = '#222a';
          ctx.lineWidth = 4;
          ctx.strokeText(planetNames[i], labelX, labelY);
          ctx.fillText(planetNames[i], labelX, labelY);
          ctx.restore();

          if (i === 0) {
            const satOrbitRadius = planet.r + 14;
            const satAngle = frame * 0.04;
            const satX = px + satOrbitRadius * Math.cos(satAngle);
            const satY = py + satOrbitRadius * Math.sin(satAngle);
            ctx.save();
            ctx.beginPath();
            ctx.arc(satX, satY, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#fff8b3';
            ctx.globalAlpha = 0.95;
            ctx.fill();
            ctx.restore();
          }
        }
      }
      frame++;
      animId = requestAnimationFrame(animate);
    }
    animate(0);

    function handleResize() {
      setCanvasSize();
      for (const star of stars) {
        star.x = Math.random() * width;
        star.y = Math.random() * height;
      }
    }
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Helper to convert hex to rgba
  function hexToRgba(hex, alpha = 1) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
    const num = parseInt(c, 16);
    return `rgba(${(num >> 16) & 255},${(num >> 8) & 255},${num & 255},${alpha})`;
  }

  // Helper: sleep for ms
  function sleep(ms) { return new Promise(res => setTimeout(res, ms)); }

  // BookReviewCard component for compact book review tiles
  function BookReviewCard({ title, author, rating, review, color }) {
    const textColor = useColorModeValue('#222', '#fff');
    return (
      <Box
        bg="rgba(255,255,255,0.13)"
        borderRadius="2xl"
        boxShadow="0 4px 24px 0 rgba(0,0,0,0.10)"
        p={4}
        minH={"140px"}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
        border="1px solid rgba(255,255,255,0.18)"
        backdropFilter="blur(8px)"
        style={{ WebkitBackdropFilter: 'blur(8px)' }}
        transition="box-shadow 0.3s"
        _hover={{ boxShadow: `0 8px 32px 0 ${color || 'rgba(137,239,140,0.18)'}` }}
      >
        <Text fontWeight="bold" fontSize="md" color={textColor} mb={1}>{title}</Text>
        <Text fontSize="xs" color={textColor} mb={1}>{author}</Text>
        <Text fontSize="md" color="#FFD600" mb={1}>{rating}</Text>
        <Text fontSize="xs" color={textColor}>{review}</Text>
      </Box>
    );
  }

  return (
    <Layout>
      <Box minH="100vh" py={0}>
        {/* Solar system orbits and planets BG for the whole page */}
        <Box position="fixed" zIndex={0} top={0} left={0} w="100vw" h="100vh" pointerEvents="none">
          <canvas ref={canvasRef} style={{ width: '100vw', height: '100vh', display: 'block' }} />
        </Box>
        <Box minH="100vh" py={0} position="relative" zIndex={1}>
        <VStack spacing={16} align="stretch">
          {/* Hero Section */}
          <VStack spacing={6} align="center" py={20}>
            <Heading
              as="h1"
              fontSize={{ base: '4xl', md: '6xl' }}
              fontWeight="bold"
              textAlign="center"
              color={textColor}
              letterSpacing="tight"
            >
              Blog soon (website under construction hehehe :.|   wo kya he na.... )
            </Heading>
            <Text
              fontSize={{ base: 'xl', md: '2xl' }}
              textAlign="center"
              color={textColor}
              maxW="2xl"
            >
              Thoughts, Reviews & Photography
            </Text>
              {/* --- NASA APOD Feature, no card, just floating image and text --- */}
              {apodLoading ? (
                <Text color={'#b3d1ff'}>Loading NASA fact...</Text>
              ) : apodError ? (
                <Text color="#ff7eb3">{apodError}</Text>
              ) : apod ? (
                <VStack spacing={4} align="center" w="100%" mt={8}>
                  {/* APOD Image with horizon glow on hover */}
                  <Box
                    as="figure"
                    position="relative"
                    w={{ base: '90vw', md: '700px' }}
                    maxW="900px"
                    mx="auto"
                    borderRadius="2xl"
                    overflow="hidden"
                    boxShadow="none"
                    border="0.0px solid #89EF8C"
                    _hover={{
                      boxShadow: '0 0 20px 0 #89EF8C',
                      transition: 'box-shadow 0.5s cubic-bezier(.4,2,.3,1)',
                    }}
                    transition="box-shadow 0.5s cubic-bezier(.4,2,.3,1)"
                  >
                    {apod.media_type === 'image' ? (
                      <Image
                        src={apod.url}
                        alt={apod.title}
                        w="100%"
                        h={{ base: 'auto', md: '420px' }}
                        objectFit="cover"
                        borderRadius="2xl"
                        boxShadow="0 0 0 0 transparent"
                        transition="box-shadow 0.5s cubic-bezier(.4,2,.3,1)"
                        _hover={{ boxShadow: '0 0 20px 0 #89EF8C' }}
                      />
                    ) : apod.media_type === 'video' ? (
                      <Box
                        as="a"
                        href={apod.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        position="relative"
                        display="block"
                        w="100%"
                        h={{ base: 'auto', md: '420px' }}
                        borderRadius="2xl"
                        overflow="hidden"
                        _hover={{ boxShadow: '0 0 20px 0 #89EF8C' }}
                        transition="box-shadow 0.5s cubic-bezier(.4,2,.3,1)"
                      >
                        <Image
                          src={apod.thumbnail_url || '/images/nasa-video-thumb.jpg'}
                          alt={apod.title}
                          w="100%"
                          h={{ base: 'auto', md: '420px' }}
                          objectFit="cover"
                          borderRadius="2xl"
                        />
                        <ChakraIcon
                          as={FaPlayCircle}
                          boxSize={20}
                          color="#fff"
                          position="absolute"
                          top="50%"
                          left="50%"
                          transform="translate(-50%, -50%)"
                          filter="drop-shadow(0 2px 8px #222)"
                        />
                      </Box>
                    ) : null}
                  </Box>
                  {/* Title and Explanation, floating, with text shadow for readability */}
                  <Text
                    fontSize={{ base: 'lg', md: '2xl' }}
                    fontWeight="bold"
                    color={'#7bb6ff'}
                    textAlign="center"
                    fontFamily="'Archivo Black', 'Space Grotesk', sans-serif"
                    textShadow="0 2px 16px #000, 0 0px 2px #7bb6ff"
                  >
                    NASA Astronomy Picture of the Day
                  </Text>
                  <Text
                    fontSize={{ base: 'md', md: 'xl' }}
                    fontWeight="semibold"
                    color={'#b3d1ff'}
                    textAlign="center"
                    fontFamily="'Archivo Black', 'Space Grotesk', sans-serif"
                    textShadow="0 2px 16px #000, 0 0px 2px #7bb6ff"
                  >
                    {apod.title}
                  </Text>
                  <Text
                    fontSize={{ base: 'sm', md: 'md' }}
                    color={'#e0e6ff'}
                    textAlign="center"
                    fontFamily="'Space Mono', 'Menlo', 'monospace'"
                    textShadow="0 2px 16px #000, 0 0px 2px #7bb6ff"
                    maxW={{ base: '95vw', md: '700px' }}
                  >
                    {apod.explanation.length > 220 ? apod.explanation.slice(0, 220) + '...' : apod.explanation}
                  </Text>
                  <Text fontSize="xs" color="#7bb6ff" mt={2} textShadow="0 2px 8px #000">
                    Source: <a href="https://apod.nasa.gov/" target="_blank" rel="noopener noreferrer" style={{ color: '#b3d1ff', textDecoration: 'underline' }}>NASA APOD</a>
                  </Text>
                </VStack>
              ) : null}
          </VStack>

          {/* Book Reviews Grid - square tiles */}
          <Section>
            <Box w="100%" display="flex" justifyContent="center" mt={8} mb={8}>
              <Box w={{ base: '100%', md: '90%' }}>
                <Box fontWeight="bold" fontSize="2xl" mb={4} color={textColor}>Book Reviews</Box>
                <Box as={"div"}>
                  <Box display="grid" gridTemplateColumns={{ base: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }} gap={4}>
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

          {/* Categories as a vertical list */}
          <VStack spacing={1} align="stretch">
            {/* Blogs Section - outer green border with GSAP animation */}
            <Section>
              <Box
                ref={blogBoxRef}
                display="flex"
                alignItems="center"
                p={6}
                borderRadius="1xl"
                bg="transparent"
                border={`1px solid ${greenLine}`}
                boxShadow="none"
                minH="120px"
                h="full"
                position="relative"
                onMouseEnter={() => handleBoxEnter(blogBoxRef)}
                onMouseLeave={() => handleBoxLeave(blogBoxRef)}
                style={{ willChange: 'transform, box-shadow' }}
              >
                <Icon as={FiEdit} w={8} h={8} color={greenLine} mr={6} />
                <Box>
                  <Heading as="h2" fontSize="2xl" fontWeight="semibold" color={textColor} mb={2}>
                    Blogs
                  </Heading>
                  <Text fontSize="lg" color={textColor}>
                    Exploring technology, design, and innovation through thoughtful articles.
                  </Text>
                </Box>
              </Box>
            </Section>

            {/* Book Reviews Section - outer pink border with GSAP animation */}
            <Section>
              <Box
                ref={bookBoxRef}
                display="flex"
                alignItems="center"
                p={6}
                borderRadius="1xl"
                bg="transparent"
                border={`1px solid ${pinkLine}`}
                boxShadow="none"
                minH="120px"
                h="full"
                onMouseEnter={() => handleBoxEnter(bookBoxRef)}
                onMouseLeave={() => handleBoxLeave(bookBoxRef)}
                style={{ willChange: 'transform, box-shadow' }}
              >
                <Icon as={FiBook} w={8} h={8} color={pinkLine} mr={6} />
                <Box>
                  <Heading as="h2" fontSize="2xl" fontWeight="semibold" color={textColor} mb={2}>
                    Book Reviews
                  </Heading>
                  <Text fontSize="lg" color={textColor}>
                    Deep dives into books that have shaped my thinking and perspective.
                  </Text>
                </Box>
              </Box>
            </Section>

            {/* Photography Section - outer blue border with GSAP animation */}
            <Section>
              <Box
                ref={photoBoxRef}
                display="flex"
                alignItems="center"
                p={6}
                borderRadius="1xl"
                bg="transparent"
                border={`1px solid ${blueLine}`}
                boxShadow="none"
                minH="120px"
                h="full"
                onMouseEnter={() => handleBoxEnter(photoBoxRef)}
                onMouseLeave={() => handleBoxLeave(photoBoxRef)}
                style={{ willChange: 'transform, box-shadow' }}
              >
                <Icon as={FiCamera} w={8} h={8} color={blueLine} mr={6} />
                <Box>
                  <Heading as="h2" fontSize="2xl" fontWeight="semibold" color={textColor} mb={2}>
                    Photography
                  </Heading>
                  <Text fontSize="lg" color={textColor}>
                    Capturing moments and stories through my lens.
                  </Text>
                </Box>
              </Box>
            </Section>

              {/* Games Section - outer yellow border with GSAP animation */}
              <Section>
                <Box
                  as={NextLink}
                  href="/game"
                  display="flex"
                  alignItems="center"
                  p={6}
                  borderRadius="1xl"
                  bg="transparent"
                  border={`1px solid ${yellowLine}`}
                  boxShadow="none"
                  minH="120px"
                  h="full"
                  style={{ willChange: 'transform, box-shadow' }}
                  cursor="pointer"
                  _hover={{ textDecoration: 'none' }}
                  onMouseEnter={e => {
                    if (e.currentTarget) {
                      gsap.to(e.currentTarget, {
                        scale: 1.035,
                        y: -8,
                        boxShadow: '0 8px 32px 0 rgba(255,214,0,0.15)',
                        duration: 0.35,
                        ease: 'power3.out',
                      })
                    }
                  }}
                  onMouseLeave={e => {
                    if (e.currentTarget) {
                      gsap.to(e.currentTarget, {
                        scale: 1,
                        y: 0,
                        boxShadow: 'none',
                        duration: 0.35,
                        ease: 'power3.in',
                      })
                    }
                  }}
                >
                  <Icon as={require('react-icons/fi').FiMonitor} w={8} h={8} color={yellowLine} mr={6} />
                  <Box>
                    <Heading as="h2" fontSize="2xl" fontWeight="semibold" color={textColor} mb={2}>
                      Games
                    </Heading>
                    <Text fontSize="lg" color={textColor}>
                      Exploring interactive experiences, game design, and playful creativity.
                    </Text>
                  </Box>
                </Box>
              </Section>
            </VStack>
          </VStack>
        </Box>
      </Box>
    </Layout>
  )
}

export default Blog 