import styled from '@emotion/styled'
import { Image } from '@chakra-ui/react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Map each SVG to a title and description shown on the left
const DESIGN_SYSTEM_ITEMS = [
  { file: 'Cover.jpg', title: 'PAY-GRID', text: 'PAY-GRID is a cohesive design system crafted for UPI experiences. It establishes robust foundations (type, color, spacing) and a reusable component library to ensure clarity, accessibility, and speed across flows—from onboarding to everyday payments.' },
  { file: '10_Logo.svg', title: 'Logo', text: 'Primary and secondary marks, clear space, and usage guidance for consistent brand presence.' },
  { file: '11_Size.svg', title: 'Sizing', text: 'Scale rules and responsive constraints to keep elements legible and balanced across viewports.' },
  { file: '12_App search.svg', title: 'Search', text: 'Search patterns with focus states, suggestions, and empty results designed for clarity.' },
  { file: '13_Navigation.svg', title: 'Navigation', text: 'App navigation hierarchy and components for reliable wayfinding across screens.' },
  { file: '14_Calendar.svg', title: 'Calendar', text: 'Date selection and range picking with keyboard access and localization built-in.' },
  { file: '15_Cards.svg', title: 'Cards', text: 'Structured containers for content groupings with elevation and spacing guidelines.' },
  { file: '16_Chip.svg', title: 'Chips', text: 'Compact tokens for filters, selections, and metadata with clear affordances.' },
  { file: '17_Button.svg', title: 'Buttons', text: 'Button hierarchy, states, and placements to guide primary and secondary actions.' },
  { file: '19_Info banner.svg', title: 'Info Banners', text: 'Non-blocking announcements and inline messaging patterns.' },
  { file: '2.svg', title: 'Grid', text: 'Grid foundations to align content and create predictable rhythm.' },
  { file: '20_Text input.svg', title: 'Text Inputs', text: 'Input fields with labels, helper text, and validation feedback patterns.' },
  { file: '21_Modal.svg', title: 'Modals', text: 'Focused dialogs for critical tasks with clear exits and keyboard access.' },
  { file: '22_Upload.svg', title: 'Upload', text: 'File selection, progress, and error handling for robust uploads.' },
  { file: '23_Badge.svg', title: 'Badges', text: 'Status indicators and counts with clear color semantics.' },
  { file: '24_List.svg', title: 'Lists', text: 'List structures, densities, and interactive rows for scalable data.' },
  { file: '25_Radio and check box.svg', title: 'Selection Controls', text: 'Radios and checkboxes with accessible hit areas and focus states.' },
  { file: '27_Empty state pattern.svg', title: 'Empty States', text: 'Helpful zero-data states that guide users toward the next best action.' },
  { file: '28_Error pattern.svg', title: 'Error Patterns', text: 'Clear, actionable errors with inline recovery and escalation paths.' },
  { file: '29_Language.svg', title: 'Language', text: 'Copy guidelines for tone, clarity, and inclusivity throughout the product.' },
  { file: '3.svg', title: 'Raster Assets', text: 'Image handling and aspect ratio guidance for media in layouts.' },
  { file: '30_time dates and numbers.svg', title: 'Time & Numbers', text: 'Formatting rules for time, dates, and numerals including regional preferences.' },
  { file: '31_Localization.svg', title: 'Localization', text: 'Bidirectional layouts, truncation, and translation-ready UI guidance.' },
  { file: '4.svg', title: 'Elevation', text: 'Shadows and depth to communicate layering and interactivity.' },
  { file: '5_color.svg', title: 'Color', text: 'Core palette, semantic roles, and contrast checks for accessibility.' },
  { file: '6_Typography.svg', title: 'Typography', text: 'Type scales, weights, and line-length choices for readability.' },
  { file: '7_Icons.svg', title: 'Iconography', text: 'Stroke, size, and alignment rules for a coherent icon library.' },
  { file: '8_Spacing and padding.svg', title: 'Spacing', text: 'Spacing steps and insets to build consistent, breathable layouts.' },
  { file: '9_Radius.svg', title: 'Radius', text: 'Corner radii to signal shape language and interactive surfaces.' },
  { file: 'Components.svg', title: 'Components Overview', text: 'A high-level snapshot of reusable parts that compose screens.' },
  { file: 'Final.svg', title: 'Final Spec', text: 'Consolidated design system overview with references to each section.' }
]

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

const Text = styled.p`
  font-family: 'Manrope', sans-serif;
  font-size: 1.125rem;
  line-height: 1.6;
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

const DesignSystem = () => {
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
          // Prefer items visibly in viewport
          if (!foundVisible || dist < bestDist) {
            bestIdx = idx
            bestDist = dist
            foundVisible = true
          }
        } else if (!foundVisible && dist < bestDist) {
          // Fallback to nearest center when none visible
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
    // Initial sync
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [activeIndex])

  const items = useMemo(() => {
    // Keep Cover first if present, then sort remaining by leading number in filename
    const isCover = (f) => /cover\.jpg$/i.test(f.file)
    const cover = DESIGN_SYSTEM_ITEMS.find(isCover)
    const rest = DESIGN_SYSTEM_ITEMS.filter((it) => !isCover(it))
    const withNum = []
    const noNum = []
    rest.forEach((it) => {
      const m = it.file.match(/^(\d+)/)
      if (m) withNum.push({ n: parseInt(m[1], 10), it })
      else noNum.push(it)
    })
    withNum.sort((a, b) => a.n - b.n)
    const sorted = withNum.map((x) => x.it).concat(noNum)
    return cover ? [cover, ...sorted] : sorted
  }, [])

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
                    <Title style={{ margin: 0, marginBottom: '0.5rem' }}>{items[activeIndex]?.title}</Title>
                    <Text style={{ marginBottom: 0, color: '#BDBDBD' }}>
                      {items[activeIndex]?.text}
                    </Text>
                    <Meta>
                      <strong>Team:</strong> MUKIL KUMAR, SAMIKSHA GAJHBIYE, ABHISHEK BENNY
                    </Meta>
                  </>
                ) : (
                  <>
                    <SectionTitle>{items[activeIndex]?.title}</SectionTitle>
                    <Text style={{ marginBottom: 0, color: '#BDBDBD' }}>
                      {items[activeIndex]?.text}
                    </Text>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </LeftPane>
          <RightPane>
            {items.map((it, idx) => {
              const src = `/DESIGN%20SYSTEM/${encodeURIComponent(it.file)}`
              return (
                <ThumbWrap key={it.file} data-index={idx} ref={(el) => (itemRefs.current[idx] = el)}>
                  <Image
                    src={src}
                    alt={it.title}
                    width="100%"
                    height="auto"
                    objectFit="contain"
                    style={{ display: 'block' }}
                  />
                </ThumbWrap>
              )
            })}
          </RightPane>
        </Grid>
      </Main>
      <Footer>
        <Text style={{ fontSize: '0.875rem', color: '#888' }}>
          © 2025 UPI Design System. All rights reserved.
        </Text>
      </Footer>
    </Page>
  )
}

export default DesignSystem