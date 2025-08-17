export interface SqrtBlock {
  blockIndex: number
  sum: number
  startIndex: number
  endIndex: number
}

export interface SqrtDecompositionState {
  originalArray: number[]
  blockSize: number
  blocks: SqrtBlock[]
  arraySize: number
}

export interface VisualizationStep {
  id: string
  type: 'init' | 'update' | 'query' | 'block_calculation'
  description: string
  state: SqrtDecompositionState
  highlightedIndices: number[]
  highlightedBlocks: number[]
  currentOperation?: {
    operationType: 'update' | 'query'
    params: number[]
    result?: number
  }
}

export interface QueryOperation {
  left: number
  right: number
  result: number
  steps: VisualizationStep[]
}

export interface UpdateOperation {
  index: number
  newValue: number
  oldValue: number
  steps: VisualizationStep[]
}

export type Operation = QueryOperation | UpdateOperation

export interface VisualizationConfig {
  animationSpeed: number
  autoPlay: boolean
  showBlockBoundaries: boolean
  showIndices: boolean
}

export interface ArrayGenerationConfig {
  size: number
  minValue: number
  maxValue: number
}

export enum ViewType {
  Visualizer = 'visualizer',
  Info = 'info',
}

export interface ArrayElementProps {
  value: number
  index: number
  isHighlighted?: boolean
  isBlockBoundary?: boolean
  showIndex?: boolean
}

export interface BlockProps {
  block: SqrtBlock
  isHighlighted?: boolean
}
