<template>
  <div 
    class="array-element"
    :class="{ 
      highlighted: isHighlighted,
      'block-boundary': isBlockBoundary
    }"
  >
    <div v-if="showIndex" class="index">{{ index }}</div>
    <div class="value">{{ value }}</div>
  </div>
</template>

<script setup lang="ts">
import type { ArrayElementProps } from '../types/sqrt-decomposition'

defineProps<ArrayElementProps>()
</script>

<style scoped>
.array-element {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px;
  min-width: 48px;
  background: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.array-element:hover {
  border-color: #d1d5db;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.array-element.highlighted {
  background: #fef3c7;
  border-color: #f59e0b;
  transform: scale(1.05) translateY(-2px);
  box-shadow: 0 8px 16px rgba(245, 158, 11, 0.3);
}

.array-element.block-boundary {
  border-left: 4px solid #3b82f6;
}

.index {
  font-size: 11px;
  color: #6b7280;
  margin-bottom: 4px;
  font-weight: 500;
}

.value {
  font-weight: 600;
  font-size: 16px;
  color: #1f2937;
}
</style>