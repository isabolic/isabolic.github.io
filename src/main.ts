import { createApp } from 'vue'
import App from './App.vue'
import { vReveal } from './composables/reveal'
import './styles/main.scss'

createApp(App).directive('reveal', vReveal).mount('#app')
