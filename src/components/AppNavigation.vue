<template>
  <header class="header">
    <h1>SQRT Декомпозиция</h1>
    <nav class="navigation">
      <button
        @click="$emit('switchView', 'visualizer')"
        :class="{ active: currentView === 'visualizer' }"
        class="nav-btn"
      >
        🎮 Визуализатор
      </button>
      <button
        @click="$emit('switchView', 'info')"
        :class="{ active: currentView === 'info' }"
        class="nav-btn"
      >
        📚 Как работает алгоритм
      </button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import type { ViewType } from '../types/sqrt-decomposition'

interface Props {
  currentView: ViewType
}

interface Emits {
  (e: 'switchView', view: ViewType): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
.header {
  text-align: center;
  margin-bottom: 32px;
}

.header h1 {
  color: #1e293b;
  font-size: 2.75rem;
  font-weight: 700;
  margin: 0 0 24px 0;
  letter-spacing: -0.025em;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.navigation {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.nav-btn {
  padding: 12px 24px;
  background: white;
  color: #374151;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 500;
  font-size: 16px;
  transition: all 0.2s ease;
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-btn:hover {
  background: #f8fafc;
  border-color: #d1d5db;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.nav-btn.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.nav-btn.active:hover {
  background: #2563eb;
  border-color: #2563eb;
}
</style>
