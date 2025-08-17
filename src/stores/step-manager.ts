import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { VisualizationConfig } from '../types/sqrt-decomposition'

export const useStepManagerStore = defineStore('stepManager', () => {
  const config = ref<VisualizationConfig>({
    animationSpeed: 1000,
    autoPlay: false,
    showBlockBoundaries: true,
    showIndices: true
  })
  const isPlaying = ref(false)
  const playbackSpeed = ref(1)
  const playbackTimer = ref<number | null>(null)

  const animationDuration = computed(() => config.value.animationSpeed / playbackSpeed.value)

  function updateConfig(newConfig: Partial<VisualizationConfig>) {
      config.value = { ...config.value, ...newConfig }
    }

  function setPlaybackSpeed(speed: number) {
      playbackSpeed.value = Math.max(0.1, Math.min(3, speed))
    }

  function startAutoplay(nextStepCallback: () => void) {
      if (isPlaying.value) return
      
      isPlaying.value = true
      playbackTimer.value = setInterval(() => {
        nextStepCallback()
      }, animationDuration.value) as unknown as number
    }

  function stopAutoplay() {
      if (playbackTimer.value) {
        clearInterval(playbackTimer.value)
        playbackTimer.value = null
      }
      isPlaying.value = false
    }

  function toggleAutoplay(nextStepCallback: () => void) {
      if (isPlaying.value) {
        stopAutoplay()
      } else {
        startAutoplay(nextStepCallback)
      }
    }

  return {
    config,
    isPlaying,
    playbackSpeed,
    playbackTimer,
    animationDuration,
    updateConfig,
    setPlaybackSpeed,
    startAutoplay,
    stopAutoplay,
    toggleAutoplay
  }
})