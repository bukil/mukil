// One scene, choreographed through the complete project narrative.
const chapter = (id, label, pose = {}) => ({
  id,
  label,
  x: 1.35,
  y: -0.12,
  scale: 1,
  rx: 0.18,
  ry: -0.6,
  rz: -0.06,
  explode: 0,
  ghost: 0,
  black: 0,
  isolate: 0,
  blue: 0.25,
  edges: 0.16,
  earth: 1,
  grid: 0,
  stars: 0.75,
  glow: 0.35,
  camera: 8.8,
  sunSweep: 1,
  focus: -1,
  ...pose
})

export const STORY_CHAPTERS = [
  chapter('overview', 'The mission', {
    sunSweep: 0,
    scale: 0.92,
    ry: -0.7,
    black: 0.94,
    blue: 0.04,
    edges: 0.38,
    earth: 0.82,
    glow: 0.2
  }),
  chapter('headset', 'Step into VR', {
    x: 0,
    y: 0,
    scale: 0.9,
    ry: -0.5,
    black: 0,
    blue: 0.04,
    edges: 0.12,
    sunSweep: 0.55,
    earth: 0.7
  }),
  chapter('flight', 'Orbital flight', {
    x: 0,
    y: 0,
    scale: 0.9,
    rx: 0.2,
    ry: -0.55,
    rz: -0.12,
    blue: 0.04,
    edges: 0.08,
    earth: 0,
    glow: 0.15,
    sunSweep: 0
  }),
  chapter('spacecraft', 'A closer look', {
    scale: 0.96,
    ry: -0.5,
    black: 0,
    earth: 0.65,
    blue: 0.04,
    edges: 0.1
  }),
  chapter('inside', 'Inside Daksha', {
    focus: 7,
    x: 1.35,
    scale: 0.8,
    ry: -0.25,
    explode: 0.65,
    ghost: 0.92,
    blue: 0.45,
    edges: 0.38,
    earth: 0,
    grid: 0.8,
    glow: 0.6
  }),
  chapter('experience', 'Four ways to learn', {
    x: 1.35,
    scale: 0.9,
    ry: 0,
    blue: 0.3,
    edges: 0.24,
    earth: 0.6,
    grid: 0.1
  }),
  chapter('project-brief', 'The brief', {
    x: 1.35,
    scale: 0.86,
    ry: 0.1,
    ghost: 0.1,
    blue: 0.25,
    edges: 0.5,
    earth: 0.85
  }),
  chapter('research', 'Research', {
    focus: 4,
    x: 1.35,
    y: -0.35,
    scale: 1.08,
    ry: 0.2,
    ghost: 0.12,
    isolate: 1,
    blue: 0.25,
    edges: 0.4,
    earth: 0,
    grid: 0.7,
    glow: 0.55
  }),
  chapter('ideation', 'Interaction design', {
    focus: 1,
    x: 1.35,
    scale: 0.88,
    ry: 0.35,
    explode: 0.2,
    ghost: 0.15,
    blue: 0.35,
    edges: 0.35,
    earth: 0,
    grid: 1,
    glow: 0.5
  }),
  chapter('assets', 'Building the model', {
    focus: 5,
    x: 1.35,
    scale: 0.8,
    ry: 0.5,
    explode: 0.7,
    blue: 0.35,
    edges: 0.3,
    earth: 0,
    grid: 1
  }),
  chapter('development', 'Iteration', {
    focus: 0,
    x: 1.35,
    scale: 0.9,
    ry: 0.6,
    ghost: 0.35,
    blue: 0.35,
    edges: 0.35,
    earth: 0,
    grid: 0.85,
    glow: 0.65
  }),
  chapter('prototype', 'The experience', {
    x: 1.35,
    scale: 0.9,
    ry: 0.4,
    blue: 0.4,
    edges: 0.4,
    earth: 1,
    grid: 0,
    glow: 0.45
  }),
  chapter('usage', 'Real spaces', {
    x: 1.35,
    scale: 0.78,
    ry: 0.5,
    blue: 0.3,
    edges: 0.3,
    earth: 0.25,
    grid: 0.65
  }),
  chapter('testing', 'In people’s hands', {
    x: 1.35,
    scale: 0.9,
    ry: 0.65,
    blue: 0.35,
    edges: 0.35,
    earth: 1,
    glow: 0.4
  }),
  chapter('reflection', 'What comes next', {
    x: 1.35,
    y: -0.15,
    scale: 0.85,
    ry: 0.8,
    blue: 0.3,
    edges: 0.45,
    earth: 1,
    glow: 0.65
  })
]

export const STORY_GROUPS = [
  { label: 'Mission', id: 'overview', end: 5 },
  { label: 'Research', id: 'project-brief', end: 7 },
  { label: 'Design', id: 'ideation', end: 8 },
  { label: 'Build', id: 'assets', end: 10 },
  { label: 'Experience', id: 'prototype', end: 12 },
  { label: 'Testing', id: 'testing', end: 14 }
]

export const STORY_INDEX = Object.fromEntries(
  STORY_CHAPTERS.map((item, index) => [item.id, index])
)
