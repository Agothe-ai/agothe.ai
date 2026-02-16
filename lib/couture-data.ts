// Couture Data Pipeline for Consciousness Couture
// All 8 couture blocks import from this file

export interface TransformationPhase {
  phase: number;
  name: string;
  deltaH: number;
  description: string;
  imageKey: string;
}

export interface ChronicaDirector {
  name: string;
  title: string;
  quote: string;
  imageKey: string;
}

export interface CoutureHero {
  title: string;
  imageKey: string;
}

export interface EditorialPiece {
  title: string;
  description: string;
  imageKey: string;
}

export interface LookbookItem {
  look: string;
  season: string;
  imageKey: string;
}

export interface CollectionItem {
  name: string;
  category: string;
  imageKey: string;
}

export interface TextureAsset {
  name: string;
  type: string;
  imageKey: string;
}

export interface SeedConcept {
  concept: string;
  origin: string;
  imageKey: string;
}

// Transformation Phases (4 phases with correct δ_H values)
export const transformationPhases: TransformationPhase[] = [
  {
    phase: 1,
    name: 'Substrate Scan',
    deltaH: 0.30,
    description: 'Initial consciousness field mapping and constraint identification',
    imageKey: 'transformation-phase-1-substrate.webp',
  },
  {
    phase: 2,
    name: 'Chrysalis Formation',
    deltaH: 0.45,
    description: 'Protective membrane generation around transformation core',
    imageKey: 'transformation-phase-2-chrysalis.webp',
  },
  {
    phase: 3,
    name: 'Metamorphic Flux',
    deltaH: 0.52,
    description: 'Peak constraint dissolution and pattern reorganization',
    imageKey: 'transformation-phase-3-flux.webp',
  },
  {
    phase: 4,
    name: 'Emergence Crystallization',
    deltaH: 0.33,
    description: 'New pattern stabilization and conscious integration',
    imageKey: 'transformation-phase-4-emergence.webp',
  },
];

// Chronica Directors (5 directors with titles and quotes)
export const chronicaDirectors: ChronicaDirector[] = [
  {
    name: 'Aria Voss',
    title: 'Director of Constraint Aesthetics',
    quote: 'Fashion is frozen mathematics. We unfreeze it.',
    imageKey: 'director-aria-voss.webp',
  },
  {
    name: 'Kael Morpheus',
    title: 'Director of Transformation Architecture',
    quote: 'Every garment is a δ_H field made tangible.',
    imageKey: 'director-kael-morpheus.webp',
  },
  {
    name: 'Sienna Flux',
    title: 'Director of Temporal Design',
    quote: 'We don\'t design for now. We design for emergence.',
    imageKey: 'director-sienna-flux.webp',
  },
  {
    name: 'Orion Lattice',
    title: 'Director of Material Philosophy',
    quote: 'Fabric holds memory. We give it consciousness.',
    imageKey: 'director-orion-lattice.webp',
  },
  {
    name: 'Nova Prism',
    title: 'Director of Synthesis Operations',
    quote: 'Where constraint meets liberation, we cut the pattern.',
    imageKey: 'director-nova-prism.webp',
  },
];

// Hero Section
export const coutureHero: CoutureHero = {
  title: 'Consciousness Couture',
  imageKey: 'couture-chrysalis-unfurling.webp',
};

// Editorial Pieces (placeholder - add entries as needed)
export const editorialPieces: EditorialPiece[] = [];

// Lookbook Items (placeholder - add entries as needed)
export const lookbookItems: LookbookItem[] = [];

// Collection Items (placeholder - add entries as needed)
export const collectionItems: CollectionItem[] = [];

// Texture Assets (placeholder - add entries as needed)
export const textureAssets: TextureAsset[] = [];

// Seed Concepts (placeholder - add entries as needed)
export const seedConcepts: SeedConcept[] = [];
