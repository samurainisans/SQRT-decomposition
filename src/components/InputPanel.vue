<template>
  <section class="input-panel">
    <ArrayGenerator 
      :disabled="isInitialized"
      @generate="$emit('generateArray', $event)"
    />

    <div class="input-group">
      <label>Массив (через запятую):</label>
      <input 
        :value="inputArray"
        @input="$emit('update:inputArray', ($event.target as HTMLInputElement).value)"
        type="text" 
        placeholder="1,5,2,4,6,1,3,5,7,10"
        :disabled="isInitialized"
      />
      <button @click="$emit('initialize')" :disabled="isInitialized">
        Инициализировать
      </button>
    </div>

    <OperationsPanel 
      v-if="isInitialized"
      :max-index="maxIndex"
      @query="$emit('query', $event)"
      @update="$emit('update', $event)"
    />
  </section>
</template>

<script setup lang="ts">
import ArrayGenerator from './ArrayGenerator.vue'
import OperationsPanel from './OperationsPanel.vue'

interface Props {
  inputArray: string
  isInitialized: boolean
  maxIndex: number
}

interface Emits {
  (e: 'update:inputArray', value: string): void
  (e: 'generateArray', array: string): void
  (e: 'initialize'): void
  (e: 'query', params: { left: number; right: number }): void
  (e: 'update', params: { index: number; value: number }): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
.input-panel {
  background: white;
  border-radius: 16px;
  padding: 28px;
  margin-bottom: 24px;
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
}

.input-panel:hover {
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.07),
    0 1px 3px rgba(0, 0, 0, 0.1);
}

.input-group {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.input-group label {
  font-weight: 500;
  min-width: 140px;
  color: #374151;
  font-size: 14px;
}

.input-group input {
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  flex: 1;
  min-width: 200px;
  transition: all 0.2s ease;
}

.input-group input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-group input:disabled {
  background: #f9fafb;
  color: #9ca3af;
}

.input-group button {
  padding: 12px 24px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.input-group button:hover:not(:disabled) {
  background: #059669;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
}

.input-group button:disabled {
  background: #d1d5db;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
</style>