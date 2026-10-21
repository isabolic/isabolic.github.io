<script setup lang="ts">
import { consent, consentOpen, setConsent } from '../analytics'
</script>

<template>
  <Transition name="consent">
    <aside v-if="consentOpen" class="consent" role="dialog" aria-label="Analytics consent">
      <p class="consent__title mono">// tracking layer</p>
      <p class="consent__text">
        May I switch on Google Analytics? It only counts visits and clicks so I can see what's worth improving.
        No ads, no selling. Nothing loads unless you accept.
      </p>
      <div class="consent__actions">
        <button class="consent__btn consent__btn--primary mono" @click="setConsent('granted')">Accept</button>
        <button class="consent__btn mono" @click="setConsent('denied')">Decline</button>
      </div>
      <p v-if="consent" class="consent__current mono">
        Current choice: {{ consent === 'granted' ? 'accepted' : 'declined' }}
      </p>
    </aside>
  </Transition>
</template>

<style scoped lang="scss">
.consent {
  position: fixed;
  left: 16px;
  bottom: 16px;
  z-index: 40;
  width: min(380px, calc(100vw - 32px));
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--bg-raised);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
}

.consent__title {
  margin: 0 0 8px;
  font-size: 12px;
  color: var(--accent);
}

.consent__text {
  margin: 0 0 16px;
  font-size: 14px;
  color: var(--ink-muted);
  text-wrap: pretty;
}

.consent__actions {
  display: flex;
  gap: 8px;
}

.consent__btn {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: transparent;
  color: var(--ink);
  font-size: 13px;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover,
  &:focus-visible {
    border-color: var(--accent);
  }

  &--primary {
    background: var(--accent);
    border-color: var(--accent);
    color: var(--bg);
    font-weight: 700;
  }
}

.consent__current {
  margin: 12px 0 0;
  font-size: 11px;
  color: var(--ink-faint);
}

.consent-enter-active,
.consent-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}

.consent-enter-from,
.consent-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
