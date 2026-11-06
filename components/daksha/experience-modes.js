export const EXPERIENCE_MODES = [
  {
    id: 'mode-explore',
    title: 'Explore Daksha',
    eyebrow: '01 / NATIVE ENVIRONMENT',
    heading: 'In orbit.',
    description:
      'Rotate the satellite to explore its form and deployment configuration.',
    cue: 'Scroll to move around Daksha',
    short: 'Explore'
  },
  {
    id: 'mode-learning',
    title: 'Learning mode',
    eyebrow: '02 / DISCOVER EACH PART',
    heading: 'Part by part.',
    description: 'Select a component to separate it from the structure.',
    cue: 'Scroll to focus on the next subassembly',
    short: 'Learn'
  },
  {
    id: 'mode-assembly',
    title: 'Guided assembly',
    eyebrow: '03 / UNDERSTAND THE HIERARCHY',
    heading: 'Build the structure.',
    description:
      'Follow individual parts along spatial guides as they assemble into the satellite.',
    cue: 'Scroll to preview the assembly sequence',
    short: 'Assemble'
  },
  {
    id: 'mode-people',
    title: 'People & places',
    eyebrow: '04 / THE PEOPLE BEHIND DAKSHA',
    heading: 'Behind the mission.',
    description:
      'Meet the team, researchers, and students connected to Daksha.',
    cue: 'Scroll to reveal the connections',
    short: 'People'
  }
]

// Subassembly-level teaching preview; this is not a manufacturing instruction.
export const ASSEMBLY_PARTS = [
  'Spacecraft bus',
  'Side detectors',
  'Upper frame',
  'Detector electronics',
  'Detector housings',
  'Sensors',
  'Crown',
  'Battery packs',
  'Solar arrays'
]

export const LEARNING_PARTS = [
  'Crown',
  'Upper frame',
  'Detector housings',
  'Detector electronics',
  'Sensors',
  'Side detectors',
  'Spacecraft bus',
  'Battery packs',
  'Solar arrays'
]
