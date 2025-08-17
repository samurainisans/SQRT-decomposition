<template>
  <section class="visualization">
    <div class="array-container">
      <h3>Массив</h3>
      <div class="array-display">
        <ArrayElement
          v-for="(value, index) in originalArray"
          :key="index"
          :value="value"
          :index="index"
          :is-highlighted="currentStep?.highlightedIndices.includes(index) ?? false"
          :is-block-boundary="index % blockSize === 0 && showBlockBoundaries"
          :show-index="showIndices"
        />
      </div>
    </div>

    <div class="blocks-container">
      <h3>Блоки</h3>
      <div class="blocks-display">
        <SqrtBlock
          v-for="(block, index) in blocks"
          :key="index"
          :block="block"
          :is-highlighted="currentStep?.highlightedBlocks.includes(index) ?? false"
        />
      </div>
    </div>

    <div v-if="currentStep?.currentOperation" class="operation-info">
      <h3>Текущая операция</h3>
      <p>
        <strong>
          {{ currentStep.currentOperation.operationType === 'query' ? 'Запрос' : 'Обновление' }}:
        </strong>
        {{ currentStep.currentOperation.params.join(', ') }}
      </p>
      <p v-if="currentStep.currentOperation.result !== undefined">
        <strong>Результат:</strong> {{ currentStep.currentOperation.result }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import ArrayElement from './ArrayElement.vue'
import SqrtBlock from './SqrtBlock.vue'
import type { SqrtBlock as SqrtBlockType, VisualizationStep } from '../types/sqrt-decomposition'

interface Props {
  originalArray: number[]
  blocks: SqrtBlockType[]
  blockSize: number
  currentStep?: VisualizationStep | null
  showBlockBoundaries: boolean
  showIndices: boolean
}

defineProps<Props>()
</script>

<style scoped>
.visualization {
  background: white;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
}

.array-container, .blocks-container {
  margin-bottom: 32px;
}

.array-container h3, .blocks-container h3 {
  margin: 0 0 20px 0;
  color: #1e293b;
  font-weight: 600;
  font-size: 18px;
}

.array-display {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  padding: 16px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.blocks-display {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  padding: 16px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.operation-info {
  margin-top: 24px;
  padding: 20px;
  background: #eff6ff;
  border-radius: 12px;
  border: 2px solid #dbeafe;
}

.operation-info h3 {
  margin: 0 0 12px 0;
  color: #1e40af;
  font-weight: 600;
}

.operation-info p {
  margin: 8px 0;
  color: #1e40af;
  font-weight: 500;
}
</style>