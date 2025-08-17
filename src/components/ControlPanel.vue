<template>
  <section class="control-panel">
    <div class="controls">
      <button @click="$emit('previousStep')" :disabled="!canGoPrevious">← Предыдущий шаг</button>
      <button @click="$emit('nextStep')" :disabled="!canGoNext">Следующий шаг →</button>
      <button @click="$emit('toggleAutoplay')" :class="{ active: isPlaying }">
        {{ isPlaying ? 'Пауза' : 'Автовоспроизведение' }}
      </button>
      <button @click="$emit('reset')" class="reset-btn">Сброс</button>
    </div>

    <div class="step-info">
      <p>Шаг {{ currentStep + 1 }} из {{ totalSteps }}</p>
      <p v-if="stepDescription">{{ stepDescription }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  currentStep: number
  totalSteps: number
  canGoPrevious: boolean
  canGoNext: boolean
  isPlaying: boolean
  stepDescription?: string
}

interface Emits {
  (e: 'previousStep'): void
  (e: 'nextStep'): void
  (e: 'toggleAutoplay'): void
  (e: 'reset'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
.control-panel {
  background: white;
  border-radius: 16px;
  padding: 28px;
  margin-bottom: 24px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
}

.controls {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.controls button {
  padding: 10px 18px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.controls button:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #d1d5db;
  transform: translateY(-1px);
}

.controls button:disabled {
  background: #f9fafb;
  color: #d1d5db;
  cursor: not-allowed;
  transform: none;
}

.controls button.active {
  background: #f59e0b;
  color: white;
  border-color: #f59e0b;
}

.controls button.active:hover {
  background: #d97706;
  border-color: #d97706;
}

.controls button.reset-btn {
  background: #ef4444;
  color: white;
  border-color: #ef4444;
}

.controls button.reset-btn:hover {
  background: #dc2626;
  border-color: #dc2626;
}

.step-info p {
  margin: 6px 0;
  font-weight: 500;
  color: #374151;
}
</style>
