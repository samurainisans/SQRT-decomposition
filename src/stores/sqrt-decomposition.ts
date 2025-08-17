import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { 
  SqrtDecompositionState, 
  SqrtBlock, 
  VisualizationStep,
  UpdateOperation,
  QueryOperation 
} from '../types/sqrt-decomposition'

export const useSqrtDecompositionStore = defineStore('sqrtDecomposition', () => {
  const currentState = ref<SqrtDecompositionState | null>(null)
  const visualizationSteps = ref<VisualizationStep[]>([])
  const currentStepIndex = ref(-1)
  const isInitialized = ref(false)

  const blockSize = computed(() => currentState.value?.blockSize ?? 0)
  const arraySize = computed(() => currentState.value?.arraySize ?? 0)
  const blocks = computed(() => currentState.value?.blocks ?? [])
  const originalArray = computed(() => currentState.value?.originalArray ?? [])

  function initialize(inputArray: number[]) {
      const n = inputArray.length
      const blockSize = Math.floor(Math.sqrt(n))
      const blockCount = Math.ceil(n / blockSize)
      
      const blocks: SqrtBlock[] = []
      
      for (let i = 0; i < blockCount; i++) {
        const startIndex = i * blockSize
        const endIndex = Math.min(startIndex + blockSize - 1, n - 1)
        let sum = 0
        
        for (let j = startIndex; j <= endIndex; j++) {
          sum += inputArray[j]
        }
        
        blocks.push({
          blockIndex: i,
          sum,
          startIndex,
          endIndex
        })
      }

      currentState.value = {
        originalArray: [...inputArray],
        blockSize,
        blocks,
        arraySize: n
      }

      visualizationSteps.value = [{
        id: 'init',
        type: 'init',
        description: `Инициализация SQRT-декомпозиции для массива размером ${n}. Размер блока: ${blockSize}`,
        state: { ...currentState.value },
        highlightedIndices: [],
        highlightedBlocks: []
      }]

      currentStepIndex.value = 0
      isInitialized.value = true
    }

  function update(index: number, newValue: number): UpdateOperation {
      if (!currentState.value) throw new Error('Store not initialized')
      
      const oldValue = currentState.value.originalArray[index]
      const blockIndex = Math.floor(index / currentState.value.blockSize)
      
      const steps: VisualizationStep[] = []
      
      steps.push({
        id: `update-${Date.now()}-1`,
        type: 'update',
        description: `Обновляем элемент по индексу ${index}: ${oldValue} → ${newValue}`,
        state: { ...currentState.value },
        highlightedIndices: [index],
        highlightedBlocks: [blockIndex],
        currentOperation: {
          operationType: 'update',
          params: [index, newValue]
        }
      })

      currentState.value.originalArray[index] = newValue
      currentState.value.blocks[blockIndex].sum += newValue - oldValue

      steps.push({
        id: `update-${Date.now()}-2`,
        type: 'block_calculation',
        description: `Обновляем сумму блока ${blockIndex}: ${currentState.value.blocks[blockIndex].sum - (newValue - oldValue)} → ${currentState.value.blocks[blockIndex].sum}`,
        state: { ...currentState.value },
        highlightedIndices: [index],
        highlightedBlocks: [blockIndex],
        currentOperation: {
          operationType: 'update',
          params: [index, newValue]
        }
      })

      visualizationSteps.value.push(...steps)
      currentStepIndex.value = visualizationSteps.value.length - 1

      return {
        index,
        newValue,
        oldValue,
        steps
      }
    }

  function query(left: number, right: number): QueryOperation {
      if (!currentState.value) throw new Error('Store not initialized')
      
      const steps: VisualizationStep[] = []
      let sum = 0
      let l = left

      steps.push({
        id: `query-${Date.now()}-start`,
        type: 'query',
        description: `Начинаем запрос суммы на отрезке [${left}, ${right}]`,
        state: { ...currentState.value },
        highlightedIndices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
        highlightedBlocks: [],
        currentOperation: {
          operationType: 'query',
          params: [left, right]
        }
      })

      while (l <= right && l % currentState.value.blockSize !== 0) {
        sum += currentState.value.originalArray[l]
        steps.push({
          id: `query-${Date.now()}-partial-${l}`,
          type: 'query',
          description: `Обрабатываем элемент ${l} в начале диапазона: ${currentState.value.originalArray[l]}`,
          state: { ...currentState.value },
          highlightedIndices: [l],
          highlightedBlocks: [],
          currentOperation: {
            operationType: 'query',
            params: [left, right],
            result: sum
          }
        })
        l++
      }

      while (l + currentState.value.blockSize - 1 <= right) {
        const blockIndex = Math.floor(l / currentState.value.blockSize)
        sum += currentState.value.blocks[blockIndex].sum
        
        steps.push({
          id: `query-${Date.now()}-block-${blockIndex}`,
          type: 'query',
          description: `Используем сумму блока ${blockIndex}: ${currentState.value.blocks[blockIndex].sum}`,
          state: { ...currentState.value },
          highlightedIndices: [],
          highlightedBlocks: [blockIndex],
          currentOperation: {
            operationType: 'query',
            params: [left, right],
            result: sum
          }
        })
        
        l += currentState.value.blockSize
      }

      while (l <= right) {
        sum += currentState.value.originalArray[l]
        steps.push({
          id: `query-${Date.now()}-partial-end-${l}`,
          type: 'query',
          description: `Обрабатываем элемент ${l} в конце диапазона: ${currentState.value.originalArray[l]}`,
          state: { ...currentState.value },
          highlightedIndices: [l],
          highlightedBlocks: [],
          currentOperation: {
            operationType: 'query',
            params: [left, right],
            result: sum
          }
        })
        l++
      }

      steps.push({
        id: `query-${Date.now()}-result`,
        type: 'query',
        description: `Результат запроса: ${sum}`,
        state: { ...currentState.value },
        highlightedIndices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
        highlightedBlocks: [],
        currentOperation: {
          operationType: 'query',
          params: [left, right],
          result: sum
        }
      })

      visualizationSteps.value.push(...steps)
      currentStepIndex.value = visualizationSteps.value.length - 1

      return {
        left,
        right,
        result: sum,
        steps
      }
    }

  function goToStep(stepIndex: number) {
      if (stepIndex >= 0 && stepIndex < visualizationSteps.value.length) {
        currentStepIndex.value = stepIndex
        currentState.value = { ...visualizationSteps.value[stepIndex].state }
      }
    }

  function nextStep() {
      if (currentStepIndex.value < visualizationSteps.value.length - 1) {
        currentStepIndex.value++
        currentState.value = { ...visualizationSteps.value[currentStepIndex.value].state }
      }
    }

  function previousStep() {
      if (currentStepIndex.value > 0) {
        currentStepIndex.value--
        currentState.value = { ...visualizationSteps.value[currentStepIndex.value].state }
      }
    }

  function reset() {
      currentState.value = null
      visualizationSteps.value = []
      currentStepIndex.value = -1
      isInitialized.value = false
    }

  return {
    currentState,
    visualizationSteps,
    currentStepIndex,
    isInitialized,
    blockSize,
    arraySize,
    blocks,
    originalArray,
    initialize,
    update,
    query,
    goToStep,
    nextStep,
    previousStep,
    reset
  }
})
