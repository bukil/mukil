import styled from '@emotion/styled'
import { Image } from '@chakra-ui/react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Use single-letter SVGs located in `/public/hfid` (a.svg, b.svg, c.svg, ...)
const LETTER_FILES = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s']
// Display metadata is independent from file names. Update these titles/texts without touching filenames.
const DISPLAY_META = [
  { title: 'Introduction', text: 'An exploration of ergonomics, accessibility and the human side of interaction design.' },
  { title: 'Research Questions', text: `
RQ1 looks at the real usability impact of dark patterns and how strongly users perceive them as manipulative.
RQ2 examines whether dark patterns offer measurable business gains compared to clean, bright alternatives.
RQ3 investigates whether Indian users experience the same level of susceptibility and felt manipulation as users in other contexts.` },
  { title: 'Context', text: 'Most Indian digital platforms still rely on dark patterns. A nationwide LocalCircles study covering 2.9 lakh responses across 392 districts over 22 months reported that 97 percent of platforms continued using manipulative design despite repeated government advisories.' },
  { title: 'Why "Dark"', text: `Dark patterns are interface tactics that push users into choices they did not intend. They work by hiding information, nudging attention, or framing options in misleading ways. The trick is subtle pressure disguised as convenience. 
    Common Types
Confirmshaming - A dialog in an app that says “No, I dont care about security” when you decline an upgrade.
Forced Continuity - A free trial on a Mac or Windows app that auto renews without a clear reminder.
Sneak into Basket - An online store adding an extra warranty to your cart unless you manually remove it.
Obstruction - Canceling a subscription on a streaming app requires many steps, while subscribing needs one.
Roach Motel - Easy to get into a service, but difficult to leave, like hidden account deletion options in system settings.` },
  { title: 'Literature Review', text: `The project began by mapping how researchers define and classify dark patterns. Work by Arunesh Mathur outlined the first large scale catalog of dark pattern categories, showing how small interface shifts can create measurable behavioral change. Colin Gray’s research added a design angle, tracing how these patterns emerge from industry pressures and how designers justify or normalize them inside teams.

Across the papers, a shared theme appeared - Dark patterns are rarely accidents. They follow repeatable structures, respond to business incentives, and exploit predictable cognitive shortcuts. The literature also showed that users rarely recognise these tactics until after completing the action, which makes dark patterns effective but ethically problematic.

These insights shaped our study by highlighting what remains unclear in the Indian context - The degree of usability loss, the real business benefit, and how cultural familiarity with digital systems shapes susceptibility.` },
  { title: 'Existing Interfaces', text: ` To understand how dark patterns appear in real products, we examined interfaces from Booking.com, Goibibo, and Tata 1MG. Hotel and travel platforms became a primary focus because they consistently show some of the highest concentrations of deceptive cues.

Why Hotel Booking
Industry analyses report that nearly 75 percent of deceptive patterns appear in travel booking interfaces. Another study found that 39.2 percent of all dark pattern instances occur during purchasing and booking flows. These environments rely heavily on urgency, scarcity, and time pressure, which makes them ideal territory for manipulative design.` },
  { title: 'Prototype', text: `The initial goal was to build a fully coded hotel booking application so the study could run in a controlled environment without external variables like interaction technique or platform specific behavior. A custom app would have allowed complete control over timing, layout, and the exact placement of dark and bright patterns.

Time constraints pushed us toward a Figma based prototype for the final quantitative study. The switch kept the flow consistent with real booking platforms while allowing rapid iteration and fine grained control over screens. The prototype reproduced core interactions such as search, listing comparison, pricing cues, and checkout steps, which made it suitable for isolating the effect of individual patterns during testing.

This approach balanced realism with experimental control, giving us a clean environment to measure usability, perception, and susceptibility.` },
  { title: 'Method', text: `Participants completed a hotel booking task inside our controlled Figma prototype. Before starting, we asked about their past experience with premium subscriptions and why they usually visit booking platforms. These questions helped establish their expectations. During and after the task, we asked whether they had a clear agenda, whether the interface pulled them away from it, and at what points they felt nudged or manipulated. We also asked how concerned they are about such issues in their everyday digital use. This short interview driven method linked their actions with their perception of dark patterns.` },
  { title: 'Design Study', text: '40 Participants\n20 Bright-pattern users\n20 Dark-pattern users\n8 among them participated in eye tracking.\nEach participant completed two tasks: find the cheapest and best room for two adults with required amenities, and subscribe to a premium plan then unsubscribe. This setup allowed clean comparison of behavior across conditions' },
  { title: 'Observation', text: 'Users in the dark flow reported lower usability scores on the SUS scale and higher perceived deception on the SDS scale. This pattern confirmed that dark patterns reduce clarity and trust even when the task itself remains the same.' },
  { title: 'Observation - Time vs SDS', text: `Longer task time in dark flows showed a moderate rise in perceived deception, while bright flows showed almost no link between time and perceived darkness. ` },
  { title: 'Observation - Time vs Usability', text: `Dark flows showed a moderate drop in usability scores as time increased. Bright flows showed almost no change, suggesting stable usability even with longer tasks. ` },
  { title: 'Business Centric Dark Patterns', text: `The hypothesis suggested that companies use distraction points to strategically distribute bookings across partner hotels instead of letting users choose a single preferred option. The graph output supports this. In the dark pattern flow, multiple peaks show users being redirected toward several hotels, reflecting scattered decision paths shaped by subtle nudges. The bright flow shows a single clean surge, which indicates a more direct and informed choice with no imposed detours.` },
  { title: 'Observation RQ3', text: `Participants described clear moments of manipulation in the dark flow. Forced actions, subscription traps, bait and switch, and roach motel patterns were reported far more often than in the bright flow.` },
  { title: 'Observation RQ3', text: `There is a moderate positive link between how many dark cues users encountered and how many they personally reported. Higher exposure led to stronger feelings of manipulation.` },
  { title: 'Observation RQ3', text: `Most users in the bright flow identified few or no manipulation cues. Dark flow users flagged multiple instances, which reinforced the difference in perceived trust between the two conditions.` },
  { title: 'Observation', text: `Most users in the bright flow identified few or no manipulation cues. Dark flow users flagged multiple instances, which reinforced the difference in perceived trust between the two conditions.` },
  { title: 'Reflections', text: `` },
  { title: 'Prototype', text: `` }
]

const HUMAN_FACTOR_ITEMS = LETTER_FILES.map((ch) => ({
  file: `${ch}.svg`,
  // keep internal title as filename-derived fallback; left pane will prefer DISPLAY_META
  title: ch.toUpperCase(),
  text: ''
}))

const Page = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000000;
  display: flex;
  flex-direction: column;
`

const Header = styled.header`
  padding: 120px 80px 0;
  background: #000000;
`

const Title = styled.h1`
  font-family: 'Anton', sans-serif;
  font-size: 2.75rem;
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: 0.02em;
  line-height: 1.05;
`

const Main = styled.main`
  padding: 0 0 60px 80px; /* left gutter only; right edge flush */
  flex: 1;
  background: #000000;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 40px;
  align-items: start;
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`

const LeftPane = styled.div`
  position: sticky;
  top: 0;
  align-self: start;
  color: #CCCCCC;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center; /* vertical middle */
  align-items: flex-start; /* left aligned */
  @media (max-width: 960px) {
    position: static;
    height: auto;
    justify-content: flex-start;
    margin-bottom: 24px;
  }
`

const RightPane = styled.div`
  /* Full-height natural page scroll; no inner scroll */
  overflow: visible;
  max-height: none;
  padding-right: 0;
  margin-right: 0;
`

const SectionTitle = styled.h2`
  font-family: 'Anton', sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: 0.02em;
  margin: 0 0 0.5rem 0;
`

const Text = styled.div`
  font-family: 'Manrope', sans-serif;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #CCCCCC;
  max-width: 720px;
  margin-bottom: 1.25rem;
`

const Meta = styled.p`
  font-family: 'Manrope', sans-serif;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #9B9B9B;
  margin-top: 0.75rem;
`

const SubtleLabel = styled.div`
  font-family: 'Manrope', sans-serif;
  font-size: 0.8rem;
  line-height: 1.4;
  color: #8A8A8A;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-top: 0.75rem;
  margin-bottom: 0.25rem;
`

const Bullets = styled.ul`
  list-style: disc;
  padding-left: 1.25rem;
  margin: 0 0 0.5rem 0;
`

const Bullet = styled.li`
  font-family: 'Manrope', sans-serif;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #BDBDBD;
`

const ThumbWrap = styled.div`
  width: 100%;
  background: transparent;
  padding: 0;
  margin: 0;
`

const Footer = styled.footer`
  padding: 40px 80px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: #000000;
`

const HumanFactor = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const itemRefs = useRef([])

  useEffect(() => {
    let ticking = false

    const computeActive = () => {
      const refs = itemRefs.current.filter(Boolean)
      if (!refs.length) { ticking = false; return }
      const vh = window.innerHeight || 0
      const viewportCenter = vh / 2
      let bestIdx = activeIndex
      let bestDist = Infinity
      let foundVisible = false

      refs.forEach((el, idx) => {
        const rect = el.getBoundingClientRect()
        const visiblePx = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0))
        const visibleRatio = rect.height > 0 ? visiblePx / rect.height : 0
        const center = rect.top + rect.height / 2
        const dist = Math.abs(center - viewportCenter)
        if (visibleRatio > 0.05) {
          if (!foundVisible || dist < bestDist) {
            bestIdx = idx
            bestDist = dist
            foundVisible = true
          }
        } else if (!foundVisible && dist < bestDist) {
          bestIdx = idx
          bestDist = dist
        }
      })
      if (bestIdx !== activeIndex) setActiveIndex(bestIdx)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(computeActive)
      }
    }

    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onScroll)
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [activeIndex])

  const items = useMemo(() => {
    const isCover = (f) => /^cover\./i.test(f.file)
    const cover = HUMAN_FACTOR_ITEMS.find(isCover)
    const rest = HUMAN_FACTOR_ITEMS.filter((it) => !isCover(it))
    const withNum = []
    const noNum = []
    rest.forEach((it) => {
      const m = it.file.match(/(\d+)/)
      if (m) withNum.push({ n: parseInt(m[1], 10), it })
      else noNum.push(it)
    })
    withNum.sort((a, b) => a.n - b.n)
    noNum.sort((a, b) => a.file.localeCompare(b.file))
    const sorted = withNum.map((x) => x.it).concat(noNum)
    return cover ? [cover, ...sorted] : sorted
  }, [])

  // Scroll-synced phone overlay:
  const phoneRef = useRef(null)
  const prototypeIndex = DISPLAY_META.findIndex((d) => (d.title || '').toLowerCase().startsWith('prototype'))
  const [phoneProgress, setPhoneProgress] = useState(0)

  useEffect(() => {
    let raf = null

    const updatePhone = () => {
      const idx = prototypeIndex
      const el = itemRefs.current[idx]
      if (!el) {
        setPhoneProgress(0)
        return
      }
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight || 1

      // progress mapping: show up a bit later, then rise quickly
      // startPoint: begin when section top is moderately below viewport (60% of its height)
      // endPoint: finish when section is slightly above viewport (20% of its height)
      const startPoint = vh + rect.height * 0.6
      const endPoint = -rect.height * 0.2
      let t = (startPoint - rect.top) / (startPoint - endPoint)
      // lower exponent to accelerate progress early for faster perceived motion
      t = Math.max(0, Math.min(1, Math.pow(t, 0.28)))
      setPhoneProgress(t)
    }

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(updatePhone)
    }

    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onScroll)
    onScroll()

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [prototypeIndex])

  // Helper to render left-pane text with simple formatting:
  // - Bold RQ numbers (e.g. RQ1)
  // - Bold the "Common Types" line
  // - Bold the type name before a hyphen (e.g. "Confirmshaming - ...")
  // Return a structured array describing how each line should be rendered.
  // This avoids returning JSX from helper logic and keeps rendering in the main JSX scope.
  const renderLeftText = (raw) => {
    const text = (raw || '')
    const lines = text.split('\n')
    return lines.map((ln, i) => {
      const line = ln.replace(/\t/g, ' ').trim()
      if (!line) return { kind: 'spacer', key: i }
      const rq = line.match(/^(RQ\d+)\b(.*)$/i)
      if (rq) return { kind: 'rq', key: i, num: rq[1], rest: rq[2].trim() }
      if (line.toLowerCase() === 'why hotel booking') return { kind: 'title', key: i, text: line }
      if (line.toLowerCase().startsWith('common types')) return { kind: 'bold', key: i, text: line }
      const hy = line.match(/^([^\-]+)\s*-\s*(.*)$/)
      if (hy) return { kind: 'hyphen', key: i, left: hy[1].trim(), right: hy[2] }
      const numberLine = line.match(/^(\d+)\s*(.*)$/)
      if (numberLine) return { kind: 'number', key: i, num: numberLine[1], rest: numberLine[2] }
      return { kind: 'text', key: i, text: line }
    })
  }

  // compute transform for the phone overlay (pixels)
  const phoneY = React.useMemo(() => {
    // extend travel distance so the phone travels further to the top and stays visible longer
    const start = 9600 // off-screen start (px) — increase so it begins much lower off-screen
    const end = -920  // final position above the section (px) — much higher so it reaches the top
    return start + (end - start) * (phoneProgress || 0)
  }, [phoneProgress])
  // Fade-in early then fade-out as it goes above the section
  const phoneOpacity = React.useMemo(() => {
    const p = phoneProgress || 0
    const fadeIn = 1
    const fadeOutStart = 1
    if (p <= 0) return 0
    if (p < fadeIn) return p / fadeIn
    if (p > fadeOutStart) return Math.max(0, 1 - (p - fadeOutStart) / (1 - fadeOutStart))
    return 1
  }, [phoneProgress])

  return (
    <Page>
      <Header />
      <Main>
        <Grid>
          <LeftPane>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.36, ease: 'easeOut' }}
              >
                {activeIndex === 0 ? (
                  <>
                    <Title style={{ margin: 0, marginBottom: '0.5rem' }}>{(DISPLAY_META[activeIndex]?.title) || items[activeIndex]?.title}</Title>
                    <Text style={{ marginBottom: 0, color: '#BDBDBD' }}>
                      {renderLeftText(((DISPLAY_META[activeIndex]?.text) || items[activeIndex]?.text) || '').map((node) => {
                        if (node.kind === 'spacer') return <div key={node.key} style={{ marginBottom: 6 }} />
                        if (node.kind === 'rq') return <div key={node.key} style={{ marginBottom: 6 }}><strong>{node.num}</strong>{node.rest ? ' ' + node.rest : ''}</div>
                        if (node.kind === 'title') return <SectionTitle key={node.key}>{node.text}</SectionTitle>
                        if (node.kind === 'bold') return <div key={node.key} style={{ marginBottom: 6 }}><strong>{node.text}</strong></div>
                        if (node.kind === 'hyphen') return <div key={node.key} style={{ marginBottom: 6 }}><strong>{node.left}</strong> - {node.right}</div>
                        if (node.kind === 'number') return <div key={node.key} style={{ marginBottom: 8 }}><strong style={{ fontSize: '1rem', fontWeight: 700 }}>{node.num}</strong>{node.rest ? ' ' + node.rest : ''}</div>
                        return <div key={node.key} style={{ marginBottom: 6 }}>{node.text}</div>
                      })}
                    </Text>
                    <Meta>
                    Investigating the Influence of Dark Patterns on User Behavior and Decision-Making
A user centric study conducted through controlled experimental testing in digital interfaces. The project examines how interface cues shape choices, how users interpret manipulative design elements, and where the thresholds of trust and awareness lie when interacting with modern digital systems.
                      <br /><strong>Team:</strong> MUKIL , ABHISHEK, ARINDAM, TANMAY SANWAL
                    </Meta>
                  </>
                ) : (
                  <>
                    <SectionTitle>{(DISPLAY_META[activeIndex]?.title) || items[activeIndex]?.title}</SectionTitle>
                    <Text style={{ marginBottom: 0, color: '#BDBDBD' }}>
                      {renderLeftText(((DISPLAY_META[activeIndex]?.text) || items[activeIndex]?.text) || '').map((node) => {
                        if (node.kind === 'spacer') return <div key={node.key} style={{ marginBottom: 6 }} />
                        if (node.kind === 'rq') return <div key={node.key} style={{ marginBottom: 6 }}><strong>{node.num}</strong>{node.rest ? ' ' + node.rest : ''}</div>
                        if (node.kind === 'title') return <SectionTitle key={node.key}>{node.text}</SectionTitle>
                        if (node.kind === 'bold') return <div key={node.key} style={{ marginBottom: 6 }}><strong>{node.text}</strong></div>
                        if (node.kind === 'hyphen') return <div key={node.key} style={{ marginBottom: 6 }}><strong>{node.left}</strong> - {node.right}</div>
                        if (node.kind === 'number') return <div key={node.key} style={{ marginBottom: 8 }}><strong style={{ fontSize: '1rem', fontWeight: 700 }}>{node.num}</strong>{node.rest ? ' ' + node.rest : ''}</div>
                        return <div key={node.key} style={{ marginBottom: 6 }}>{node.text}</div>
                      })}
                    </Text>
                    {Array.isArray(items[activeIndex]?.uses) && items[activeIndex].uses.length > 0 && (
                      <>
                        <SubtleLabel>Use cases</SubtleLabel>
                        <Bullets>
                          {items[activeIndex].uses.map((u, i) => (
                            <Bullet key={`use-${i}`}>{u}</Bullet>
                          ))}
                        </Bullets>
                      </>
                    )}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </LeftPane>
          <RightPane>
            {items.map((it, idx) => {
              const ASSET_FOLDER = 'hfid'
              const src = `/${ASSET_FOLDER}/${encodeURIComponent(it.file)}`
              return (
                <ThumbWrap key={it.file} data-index={idx} ref={(el) => (itemRefs.current[idx] = el)}>
                  <Image
                    src={src}
                    alt={it.title}
                    width="100%"
                    height="auto"
                    objectFit="contain"
                    style={{ display: 'block' }}
                    onError={(e) => console.warn('Human Factor image failed to load:', src, e && e.nativeEvent)}
                    onLoad={() => console.debug('Human Factor image loaded:', src)}
                  />
                </ThumbWrap>
              )
            })}
            <div style={{ marginTop: 48, display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '100%', maxWidth: 960 }}>
                <iframe
                  title="HuFID Prototype"
                  style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
                  width={800}
                  height={800}
                  src="https://embed.figma.com/proto/7kTgXJDQaFLerfcHJ4V844/HuFID?page-id=1004%3A33418&node-id=1035-224&viewport=-62%2C-1192%2C0.16&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1035%3A3471&hide-ui=1&embed-host=share"
                  allowFullScreen
                />
              </div>
            </div>
              {/* Scroll-synced phone overlay — fixed and pointer-events none */}
                <motion.div
                  ref={phoneRef}
                  initial={{ opacity: 0 }}
                  animate={{ y: phoneY, opacity: phoneOpacity, rotate: 24, scale: 1.25 }}
                  transition={{ ease: 'linear', duration: 0 }}
                  style={{ position: 'fixed', right: '59%', width: 320, bottom: 0, zIndex: 60, pointerEvents: 'none', transformOrigin: '50% 100%' }}
                >
                  <Image src={'/hfid/phone.svg'} alt="phone" width="320px" height={'auto'} style={{ display: 'block' }} />
                </motion.div>
          </RightPane>
        </Grid>
      </Main>
      <Footer>
        <Text style={{ fontSize: '0.875rem', color: '#888' }}>
          ©
        </Text>
      </Footer>
    </Page>
  )
}

export default HumanFactor
