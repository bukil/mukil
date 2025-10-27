import styled from '@emotion/styled'
import { Image } from '@chakra-ui/react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Map each SVG to a title, description, and concise use cases for the left pane
const DESIGN_SYSTEM_ITEMS = [
  { file: 'Cover.svg', title: 'PAY-GRID', text: 'PAY-GRID is a cohesive design system crafted for UPI experiences. It establishes robust foundations (type, color, spacing) and a reusable component library to ensure clarity, accessibility, and speed across flows—from onboarding to everyday payments.' },
  { file: '10_Logo.svg', title: 'Logo', text: 'This section provides primary and secondary marks for the brand, along with strict clear space rules and usage guidance to ensure a consistent brand presence. This is applied in key areas like the app header, splash screens, and various marketing placements.', uses: ['App header / splash', 'Marketing placements'] },
  { file: '11_Size.svg', title: 'Sizing', text: 'The system includes comprehensive scale rules and responsive constraints that ensure all elements remain legible and balanced across different viewports. This is key for creating adaptive components and density variants.', uses: ['Adaptive components', 'Density variants'] },
  { file: '12_App search.svg', title: 'Search', text: 'We have defined robust search patterns that include clear focus states, helpful suggestions, and well-designed empty results pages, all designed for maximum clarity. This pattern is used for the global app search and for inline list filtering.', uses: ['Global app search', 'Inline list filtering'] },
  { file: '13_Navigation.svg', title: 'Navigation', text: 'This details the app\'s navigation hierarchy and provides components for reliable wayfinding across all screens. The primary uses for this are the main bottom tabs and any side navigation menus.', uses: ['Bottom tabs', 'Side navigation'] },
  { file: '14_Calendar.svg', title: 'Calendar', text: 'This component provides patterns for date selection and range picking, complete with built-in keyboard accessibility and localization support. It is used for features like scheduling payouts or allowing users to filter by date.', uses: ['Schedule payouts', 'Filter by date'] },
  { file: '15_Cards.svg', title: 'Cards', text: 'Cards are defined as structured containers for content groupings, with specific guidelines for elevation and internal spacing. They are fundamental for building dashboards and displaying content previews.', uses: ['Dashboards', 'Content previews'] },
  { file: '16_Chip.svg', title: 'Chips', text: 'Chips are compact, token-like elements used for filters, selections, and displaying metadata, all with clear visual affordances. They are commonly found in filter bars and as multi-select tokens.', uses: ['Filter bars', 'Multi-select tokens'] },
  { file: '17_Button.svg', title: 'Buttons', text: 'The system outlines a clear button hierarchy (primary, secondary, tertiary), along with all interactive states and placement guidelines, to effectively guide users toward primary and secondary actions.', uses: ['Primary/secondary CTAs'] },
  { file: '19_Info banner.svg', title: 'Info Banners', text: 'These are non-blocking announcements and inline messaging patterns designed to convey information without disrupting the user flow. They are ideal for status updates and other inline notices.', uses: ['Status updates', 'Inline notices'] },
  { file: '1.svg', title: 'Grid', text: 'The design system is built upon strong grid foundations, which are essential for aligning content consistently and creating a predictable, harmonious rhythm throughout the entire application. This foundation is applied to both high-level page layout and fine-grained component alignment.', uses: ['Page layout', 'Component alignment'] },
  { file: '20_Text input.svg', title: 'Text Inputs', text: 'This component defines input fields complete with labels, integrated helper text, and clear validation feedback patterns. These are the building blocks for all forms and search fields.', uses: ['Forms', 'Search fields'] },
  { file: '21_Modal.svg', title: 'Modals', text: 'Modals are focused dialogs used for critical tasks, featuring clear exit paths and full keyboard accessibility. They are reserved for important confirmations and blocking tasks that require user input.', uses: ['Confirmations', 'Blocking tasks'] },
  { file: '22_Upload.svg', title: 'Upload', text: 'This component details the patterns for file selection, progress indication, and error handling to ensure robust file uploads. This is critical for features like KYC document submission or attaching receipts.', uses: ['KYC docs', 'Receipts / attachments'] },
  { file: '23_Badge.svg', title: 'Badges', text: 'These are small status indicators and notification counts that use clear color semantics to convey meaning at a glance. They are frequently used for unread counts and status pills.', uses: ['Unread counts', 'Status pills'] },
  { file: '24_List.svg', title: 'Lists', text: 'This section defines list structures, various density options, and interactive row states to handle scalable data. This pattern is essential for history views and settings lists.', uses: ['History views', 'Settings lists'] },
  { file: '25_Radio and check box.svg', title: 'Selection Controls', text: 'This covers the design and behavior of radios and checkboxes, ensuring they have accessible hit areas and clear focus states. They are primarily used in forms and filter panels.', uses: ['Forms', 'Filter panels'] },
  { file: '27_Empty state pattern.svg', title: 'Empty States', text: 'We provide patterns for helpful zero-data states that do more than just report emptiness; they actively guide users toward the next best action. This is crucial for a user\'s first-run experience or when a search yields no results.', uses: ['First‑run', 'No results'] },
  { file: '28_Error pattern.svg', title: 'Error Patterns', text: 'This section details clear, actionable error messages with pathways for inline recovery and escalation. These patterns are applied to both form errors and system-level network failures.', uses: ['Form errors', 'Network failures'] },
  { file: '29_Language.svg', title: 'Language', text: 'This provides comprehensive copy guidelines that define the product\'s tone of voice, ensuring clarity and inclusivity throughout the product. This guides all UX writing, including helper text and tooltips.', uses: ['UX writing', 'Tooltips'] },
  { file: '2.svg', title: 'Raster Assets', text: 'This section provides detailed guidance on image handling, compression, and best practices for aspect ratios, ensuring all media within layouts is displayed correctly. This is particularly important for elements like hero art and content thumbnails.', uses: ['Hero art', 'Thumbnails'] },
  { file: '30_time dates and numbers.svg', title: 'Time & Numbers', text: 'This establishes clear formatting rules for displaying time, dates, and numerals, including support for regional preferences to avoid confusion. This is applied to receipts and financial summaries.', uses: ['Receipts', 'Summaries'] },
  { file: '31_Localization.svg', title: 'Localization', text: 'The system includes guidance for bidirectional layouts (like Right-to-Left languages), text truncation, and creating a translation-ready UI, ensuring the product is globally accessible.', uses: ['Multi-language UI'] },
  { file: '3.svg', title: 'Elevation', text: 'We utilize a defined system of shadows and depth to effectively communicate layering and the interactivity of different surfaces. This helps users understand the UI\'s hierarchy, with clear rules for surfaces and overlays.', uses: ['Surfaces', 'Overlays'] },
  { file: '5_color.svg', title: 'Color', text: 'The system defines a core color palette, assigns semantic roles to specific colors (like success, error, or warning), and includes rigorous contrast checks to ensure full accessibility. This palette governs everything from application themes to the color of states and user feedback.', uses: ['Themes', 'States/feedback'] },
  { file: '6_Typography.svg', title: 'Typography', text: 'Clear standards for type scales, font weights, and optimal line-length choices are established to maximize readability and hierarchy. These rules apply to all text elements, from primary headings to body copy and captions.', uses: ['Headings', 'Body/captions'] },
  { file: '7_Icons.svg', title: 'Iconography', text: 'This guide details the stroke, size, and alignment rules for a coherent and consistent icon library. These icons are used extensively in navigation elements, as well as for communicating actions and status.', uses: ['Navigation', 'Actions/status'] },
  { file: '8_Spacing and padding.svg', title: 'Spacing', text: 'A set of predefined spacing steps and inset values are used to build consistent, clean, and breathable layouts. This system is applied globally to both full page layouts and the internal structure of components.', uses: ['Layouts', 'Components'] },
  { file: '9_Radius.svg', title: 'Radius', text: 'Strategic corner radii are used to define the product\'s shape language and visually signal interactive surfaces. This is applied consistently to elements like buttons, cards, and form fields.', uses: ['Buttons/cards', 'Form fields'] },
  { file: '4_Components.svg', title: 'Components Overview', text: 'This serves as a high-level snapshot and visual inventory of all the reusable parts, controls, and elements that compose the application\'s screens. It is an essential tool for conducting design audits and serves as a perfect onboarding overview for new team members.' },
  { file: 'Final.svg', title: 'Final Spec', text: 'This document is a consolidated design system overview that includes references to each specific section, acting as a master guide. It is primarily used for developer handoff and formal design reviews.', uses: ['Handoff', 'Reviews'] }
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
      // Treat any file named "cover.*" (jpg/png/svg) as the first item.
      // Then sort remaining items by the first numeric token found in the filename (ascending).
      // Non-numbered files come last, sorted alphabetically for determinism.
      const isCover = (f) => /^cover\./i.test(f.file)
      const cover = DESIGN_SYSTEM_ITEMS.find(isCover)
      const rest = DESIGN_SYSTEM_ITEMS.filter((it) => !isCover(it))
      const withNum = []
      const noNum = []
      rest.forEach((it) => {
        const m = it.file.match(/(\d+)/) // find first numeric sequence anywhere in the filename
        if (m) withNum.push({ n: parseInt(m[1], 10), it })
        else noNum.push(it)
      })
      withNum.sort((a, b) => a.n - b.n)
      noNum.sort((a, b) => a.file.localeCompare(b.file))
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
              const ASSET_FOLDER = 'DESIGN SYSTEM'
              const src = `/${encodeURIComponent(ASSET_FOLDER)}/${encodeURIComponent(it.file)}`
              return (
                <ThumbWrap key={it.file} data-index={idx} ref={(el) => (itemRefs.current[idx] = el)}>
                  <Image
                    src={src}
                    alt={it.title}
                    width="100%"
                    height="auto"
                    objectFit="contain"
                    style={{ display: 'block' }}
                    onError={(e) => console.warn('DS image failed to load:', src, e && e.nativeEvent)}
                    onLoad={() => console.debug('DS image loaded:', src)}
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