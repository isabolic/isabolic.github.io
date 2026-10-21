<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { track } from './analytics'
import CareerRoute from './components/CareerRoute.vue'
import ConsentBanner from './components/ConsentBanner.vue'
import ContactSection from './components/ContactSection.vue'
import FieldNotes from './components/FieldNotes.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import SiteHeader from './components/SiteHeader.vue'
import StrataSection from './components/StrataSection.vue'
import TerminalOverlay from './components/TerminalOverlay.vue'
import TopoHero from './components/TopoHero.vue'
import type { LayerId } from './data/cv'

const activeLayers = ref<LayerId[]>([])
const terminalOpen = ref(false)

watch(terminalOpen, (open) => {
  if (open) track('terminal_open')
})

function onKey(e: KeyboardEvent) {
  const target = e.target as HTMLElement
  if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes(target.tagName)) {
    e.preventDefault()
    terminalOpen.value = !terminalOpen.value
  }
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <SiteHeader @terminal="terminalOpen = true" />
  <main>
    <TopoHero />
    <StrataSection v-model="activeLayers" />
    <CareerRoute :active="activeLayers" />
    <ProjectsSection :active="activeLayers" />
    <FieldNotes />
    <ContactSection @terminal="terminalOpen = true" />
  </main>
  <TerminalOverlay v-model="terminalOpen" />
  <ConsentBanner />
</template>
