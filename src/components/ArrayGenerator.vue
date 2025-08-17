<template>
  <div class="array-generation">
    <h3>Генерация массива</h3>
    <div class="generation-controls">
      <div class="control-group">
        <label>Размер массива:</label>
        <input 
          v-model.number="config.size" 
          type="number" 
          min="5" 
          max="50"
          :disabled="disabled"
        />
      </div>
      <div class="control-group">
        <label>Мин. значение:</label>
        <input 
          v-model.number="config.minValue" 
          type="number" 
          min="0" 
          max="100"
          :disabled="disabled"
        />
      </div>
      <div class="control-group">
        <label>Макс. значение:</label>
        <input 
          v-model.number="config.maxValue" 
          type="number" 
          min="1" 
          max="100"
          :disabled="disabled"
        />
      </div>
      <button 
        @click="handleGenerate" 
        :disabled="disabled"
        class="generate-btn"
      >
        🎲 Сгенерировать
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { ArrayGenerationConfig } from '../types/sqrt-decomposition'

interface Props {
  disabled?: boolean
  initialConfig?: Partial<ArrayGenerationConfig>
}

interface Emits {
  (e: 'generate', array: string): void
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  initialConfig: () => ({})
})

const emit = defineEmits<Emits>()

const config = reactive<ArrayGenerationConfig>({
  size: 10,
  minValue: 1,
  maxValue: 10,
  ...props.initialConfig
})

function handleGenerate() {
  const arr = []
  for (let i = 0; i < config.size; i++) {
    const randomValue = Math.floor(Math.random() * (config.maxValue - config.minValue + 1)) + config.minValue
    arr.push(randomValue)
  }
  emit('generate', arr.join(','))
}
</script>

<style scoped>
.array-generation {
  margin-bottom: 24px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.array-generation h3 {
  margin: 0 0 16px 0;
  color: #1e293b;
  font-weight: 600;
  font-size: 16px;
}

.generation-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  align-items: end;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.control-group label {
  font-weight: 500;
  color: #374151;
  font-size: 13px;
}

.control-group input {
  padding: 10px 12px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  transition: all 0.2s ease;
}

.control-group input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.control-group input:disabled {
  background: #f3f4f6;
  color: #9ca3af;
}

.generate-btn {
  padding: 10px 16px;
  background: #8b5cf6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
  white-space: nowrap;
  align-self: end;
}

.generate-btn:hover:not(:disabled) {
  background: #7c3aed;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(139, 92, 246, 0.3);
}

.generate-btn:disabled {
  background: #d1d5db;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
</style>