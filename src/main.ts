import { createApp } from 'vue'
import App from './App.vue'
import { initAnalytics } from './analytics'
import { vReveal } from './composables/reveal'
import './styles/main.scss'

initAnalytics()

createApp(App).directive('reveal', vReveal).mount('#app')
