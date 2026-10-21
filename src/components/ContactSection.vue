<script setup lang="ts">
import { ref } from 'vue'
import { analyticsEnabled, consentOpen, track } from '../analytics'
import { profile } from '../data/cv'

const emit = defineEmits<{ terminal: [] }>()

const copied = ref(false)

async function copyEmail() {
  track('copy_email')
  try {
    await navigator.clipboard.writeText(profile.email)
    copied.value = true
    setTimeout(() => (copied.value = false), 1800)
  } catch {
    window.location.href = `mailto:${profile.email}`
  }
}
</script>

<template>
  <section id="contact" class="section contact">
    <div class="wrap">
      <p v-reveal class="eyebrow">05 · Next destination</p>
      <h2 v-reveal class="contact__title">
        Let's map<br />
        something <span class="contact__accent">new</span>.
      </h2>

      <div v-reveal class="contact__grid">
        <button class="contact__email" @click="copyEmail">
          <span class="mono contact__label">{{ copied ? 'copied to clipboard ✓' : 'email · click to copy' }}</span>
          <span class="contact__value">{{ profile.email }}</span>
        </button>

        <a class="contact__item" :href="`tel:${profile.phone.replace(/\s/g, '')}`">
          <span class="mono contact__label">phone</span>
          <span>{{ profile.phone }}</span>
        </a>

        <a class="contact__item" :href="profile.github" target="_blank" rel="noopener">
          <span class="mono contact__label">github</span>
          <span>@{{ profile.handle }} ↗</span>
        </a>

        <a class="contact__item" :href="profile.linkedin" target="_blank" rel="noopener">
          <span class="mono contact__label">linkedin</span>
          <span>Ivan Sabolić ↗</span>
        </a>

        <div class="contact__item">
          <span class="mono contact__label">base camp</span>
          <span>{{ profile.location }}</span>
        </div>
      </div>

      <footer class="footer mono">
        <span>© {{ new Date().getFullYear() }} {{ profile.name }}. Built with Vue 3 + a lot of contour lines.</span>
        <span class="footer__links">
          <button v-if="analyticsEnabled" class="footer__hint" @click="consentOpen = true">analytics settings</button>
          <button class="footer__hint" @click="emit('terminal')">psst, press <kbd>`</kbd></button>
        </span>
      </footer>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contact__title {
  font-size: clamp(48px, 9vw, 120px);
  line-height: 0.92;
  letter-spacing: -0.04em;
  font-weight: 700;
  margin: 0 0 64px;
}

.contact__accent {
  color: var(--accent);
  font-style: italic;
}

.contact__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.contact__email,
.contact__item {
  all: unset;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 20px 22px;
  border: 1px solid var(--line);
  border-radius: 14px;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  font-size: 18px;

  &:hover,
  &:focus-visible {
    border-color: var(--accent);
    background: var(--bg-raised);
  }
}

div.contact__item {
  cursor: default;
}

.contact__email {
  grid-column: 1 / -1;
}

.contact__value {
  font-size: clamp(22px, 4vw, 40px);
  font-weight: 500;
  word-break: break-all;
}

.contact__label {
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-faint);
}

.footer {
  margin-top: 96px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  font-size: 12px;
  color: var(--ink-faint);
}

.footer__links {
  display: flex;
  gap: 20px;
}

.footer__hint {
  all: unset;
  cursor: pointer;

  &:hover {
    color: var(--accent);
  }
}

kbd {
  border: 1px solid var(--line);
  border-radius: 4px;
  padding: 0 5px;
}
</style>
