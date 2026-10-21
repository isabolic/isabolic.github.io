<script setup lang="ts">
import { useTheme } from '../composables/useTheme'

const emit = defineEmits<{ terminal: [] }>()

const { theme, toggle } = useTheme()

const links = [
  { href: '#strata', label: 'Strata' },
  { href: '#route', label: 'Route' },
  { href: '#notes', label: 'Notes' },
  { href: '#contact', label: 'Contact' },
]
</script>

<template>
  <header class="header">
    <div class="wrap header__inner">
      <a href="#top" class="logo mono" aria-label="Back to top">
        <span class="logo__pin" />isabolic<span class="logo__tld">.dev</span>
      </a>

      <nav class="nav" aria-label="Main">
        <a v-for="link in links" :key="link.href" :href="link.href" class="nav__link mono">{{ link.label }}</a>
      </nav>

      <div class="actions">
        <button class="icon-btn mono" title="Open terminal ( ` )" @click="emit('terminal')">&gt;_</button>
        <button
          class="icon-btn"
          :title="theme === 'dark' ? 'Switch to paper map' : 'Switch to night map'"
          :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="toggle"
        >
          <svg v-if="theme === 'dark'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
          <svg v-else viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 20;
  backdrop-filter: blur(10px);
  background: color-mix(in srgb, var(--bg) 72%, transparent);
  border-bottom: 1px solid color-mix(in srgb, var(--line) 60%, transparent);
}

.header__inner {
  height: 60px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.logo {
  text-decoration: none;
  font-weight: 700;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo__pin {
  width: 10px;
  height: 10px;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  background: var(--pin);
}

.logo__tld {
  color: var(--ink-faint);
}

.nav {
  margin-left: auto;
  display: flex;
  gap: 22px;
}

.nav__link {
  font-size: 13px;
  text-decoration: none;
  color: var(--ink-muted);
  transition: color 0.2s;

  &:hover {
    color: var(--accent);
  }
}

.actions {
  display: flex;
  gap: 8px;
}

.icon-btn {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: transparent;
  color: var(--ink);
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
}

@media (max-width: 720px) {
  .nav {
    display: none;
  }
  .actions {
    margin-left: auto;
  }
}
</style>
