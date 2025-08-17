<template>
  <div class="operations">
    <div class="operation-group">
      <h3>Запрос суммы</h3>
      <label>От индекса:</label>
      <input v-model.number="queryLeft" type="number" min="0" :max="maxIndex" />
      <label>До индекса:</label>
      <input v-model.number="queryRight" type="number" min="0" :max="maxIndex" />
      <button @click="handleQuery">Выполнить запрос</button>
    </div>

    <div class="operation-group">
      <h3>Обновление элемента</h3>
      <label>Индекс:</label>
      <input v-model.number="updateIndex" type="number" min="0" :max="maxIndex" />
      <label>Новое значение:</label>
      <input v-model.number="updateValue" type="number" />
      <button @click="handleUpdate">Обновить</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  maxIndex: number
}

interface Emits {
  (e: 'query', params: { left: number; right: number }): void
  (e: 'update', params: { index: number; value: number }): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const queryLeft = ref(3)
const queryRight = ref(7)
const updateIndex = ref(6)
const updateValue = ref(0)

function handleQuery() {
  emit('query', { left: queryLeft.value, right: queryRight.value })
}

function handleUpdate() {
  emit('update', { index: updateIndex.value, value: updateValue.value })
}
</script>

<style scoped>
.operations {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 768px) {
  .operations {
    grid-template-columns: 1fr;
  }
}

.operation-group {
  padding: 24px;
  border: 2px solid #f1f5f9;
  border-radius: 12px;
  background: #fafbfc;
  transition: all 0.2s ease;
}

.operation-group:hover {
  border-color: #e2e8f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.operation-group h3 {
  margin: 0 0 20px 0;
  color: #1e293b;
  font-weight: 600;
  font-size: 16px;
}

.operation-group label {
  display: block;
  margin: 12px 0 6px 0;
  font-weight: 500;
  color: #4b5563;
  font-size: 13px;
}

.operation-group input {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  margin-bottom: 12px;
  font-family: 'Inter', sans-serif;
  transition: all 0.2s ease;
}

.operation-group input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.operation-group button {
  width: 100%;
  padding: 12px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
}

.operation-group button:hover {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
}
</style>
