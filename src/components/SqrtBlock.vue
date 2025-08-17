<template>
  <div 
    class="block"
    :class="{ highlighted: isHighlighted }"
  >
    <div class="block-info">
      <div class="block-index">Блок {{ block.blockIndex }}</div>
      <div class="block-range">[{{ block.startIndex }}-{{ block.endIndex }}]</div>
      <div class="block-sum">Сумма: {{ block.sum }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BlockProps } from '../types/sqrt-decomposition'

defineProps<BlockProps>()
</script>

<style scoped>
.block {
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  background: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  min-width: 120px;
}

.block:hover {
  border-color: #d1d5db;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.block.highlighted {
  background: #dbeafe;
  border-color: #3b82f6;
  transform: scale(1.02) translateY(-3px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.25);
}

.block-info {
  text-align: center;
}

.block-index {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
  font-size: 14px;
}

.block-range {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 8px;
  font-weight: 500;
}

.block-sum {
  font-weight: 700;
  color: #3b82f6;
  font-size: 16px;
}
</style>