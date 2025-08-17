<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSqrtDecompositionStore } from './stores/sqrt-decomposition'
import { useStepManagerStore } from './stores/step-manager'
import AppNavigation from './components/AppNavigation.vue'
import InputPanel from './components/InputPanel.vue'
import ControlPanel from './components/ControlPanel.vue'
import VisualizationArea from './components/VisualizationArea.vue'
import AlgorithmInfo from './components/AlgorithmInfo.vue'
import { ViewType } from './types/sqrt-decomposition'

const sqrtStore = useSqrtDecompositionStore()
const stepStore = useStepManagerStore()

const currentView = ref<ViewType>(ViewType.Visualizer)
const inputArray = ref('1,5,2,4,6,1,3,5,7,10')

const currentStep = computed(() => {
  if (sqrtStore.currentStepIndex >= 0) {
    return sqrtStore.visualizationSteps[sqrtStore.currentStepIndex]
  }
  return null
})

function initializeArray() {
  const array = inputArray.value.split(',').map(Number)
  sqrtStore.initialize(array)
}

function handleQuery(params: { left: number; right: number }) {
  if (!sqrtStore.isInitialized) return
  sqrtStore.query(params.left, params.right)
}

function handleUpdate(params: { index: number; value: number }) {
  if (!sqrtStore.isInitialized) return
  sqrtStore.update(params.index, params.value)
}

function nextStep() {
  sqrtStore.nextStep()
}

function previousStep() {
  sqrtStore.previousStep()
}

function toggleAutoplay() {
  stepStore.toggleAutoplay(nextStep)
}

function reset() {
  sqrtStore.reset()
  stepStore.stopAutoplay()
}

function switchView(view: ViewType) {
  currentView.value = view
}
</script>

<template>
  <div class="app-container">
    <AppNavigation 
      :current-view="currentView" 
      @switch-view="switchView"
    />

    <main class="main-content">
      <Transition name="fade" mode="out-in">
        <div v-if="currentView === ViewType.Visualizer" key="visualizer">
          <InputPanel
            v-model:input-array="inputArray"
            :is-initialized="sqrtStore.isInitialized"
            :max-index="sqrtStore.arraySize - 1"
            @generate-array="inputArray = $event"
            @initialize="initializeArray"
            @query="handleQuery"
            @update="handleUpdate"
          />

          <ControlPanel
            v-if="sqrtStore.visualizationSteps.length > 0"
            :current-step="sqrtStore.currentStepIndex"
            :total-steps="sqrtStore.visualizationSteps.length"
            :can-go-previous="sqrtStore.currentStepIndex > 0"
            :can-go-next="sqrtStore.currentStepIndex < sqrtStore.visualizationSteps.length - 1"
            :is-playing="stepStore.isPlaying"
            :step-description="currentStep?.description"
            @previous-step="previousStep"
            @next-step="nextStep"
            @toggle-autoplay="toggleAutoplay"
            @reset="reset"
          />

          <VisualizationArea
            v-if="sqrtStore.isInitialized"
            :original-array="sqrtStore.originalArray"
            :blocks="sqrtStore.blocks"
            :block-size="sqrtStore.blockSize"
            :current-step="currentStep"
            :show-block-boundaries="stepStore.config.showBlockBoundaries"
            :show-indices="stepStore.config.showIndices"
          />
        </div>

        <div v-else-if="currentView === ViewType.Info" key="info">
          <AlgorithmInfo />
        </div>
      </Transition>
    </main>
  </div>
</template>

<style>
@import './assets/global.css';
</style>
