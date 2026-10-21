<script setup lang="ts">
import { computed, ref } from 'vue'
import { useContourField } from '../composables/useContourField'
import { jobs, profile } from '../data/cv'

const canvas = ref<HTMLCanvasElement | null>(null)

const { pointer } = useContourField(canvas, { levels: 24 })

const years = new Date().getFullYear() - 2008

const readout = computed(() => {
  const { x, y } = pointer.value
  const lat = profile.coords.lat + (0.5 - y) * 0.08
  const lon = profile.coords.lon + (x - 0.9) * 0.12
  return `${lat.toFixed(4)}° N  ${lon.toFixed(4)}° E`
})

const stats = [
  { value: `${years}+`, label: 'years on the map' },
  { value: `${jobs.length}`, label: 'waypoints' },
  { value: `${new Set(jobs.flatMap((j) => j.stack)).size}`, label: 'technologies' },
]
</script>

<template>
  <section id="top" class="hero">
    <canvas ref="canvas" class="hero__canvas" aria-hidden="true" />

    <div class="hero__frame mono" aria-hidden="true">
      <span>SHEET 45-16 · ZAGREB</span>
      <span>SCALE 1:2008–{{ new Date().getFullYear() }}</span>
      <span class="hero__readout">{{ readout }}</span>
      <span>CONTOUR INTERVAL · 1 PROJECT</span>
    </div>

    <div class="wrap hero__content">
      <p class="eyebrow">{{ profile.role }} · {{ profile.location }}</p>
      <h1 class="hero__name">
        Ivan<br />
        Sabolić<span class="hero__dot">.</span>
      </h1>
      <p class="hero__pitch">
        I've been drawing interfaces on maps since 2008. Today I build <strong>Vue 3 web components</strong> for the
        ia.de pharmacy platform, with <strong>Claude + MCP</strong> in my toolbox.
      </p>

      <div class="hero__cta">
        <a href="#route" class="btn btn--primary">Follow the route ↓</a>
        <a :href="`mailto:${profile.email}`" class="btn">Say hello</a>
      </div>

      <dl class="hero__stats">
        <div v-for="stat in stats" :key="stat.label" class="stat">
          <dt class="mono">{{ stat.label }}</dt>
          <dd>{{ stat.value }}</dd>
        </div>
      </dl>
    </div>

    <div class="hero__pin" aria-hidden="true">
      <span class="hero__pin-ring" />
      <span class="hero__pin-dot" />
      <span class="hero__pin-label mono">YOU ARE HERE</span>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 100px 0 60px;
}

.hero__canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  -webkit-mask-image: radial-gradient(ellipse at 70% 50%, #000 40%, transparent 95%);
  mask-image: radial-gradient(ellipse at 70% 50%, #000 40%, transparent 95%);
}

.hero__frame {
  position: absolute;
  inset: 76px var(--gutter) 20px;
  border: 1px solid var(--line);
  pointer-events: none;
  font-size: 10px;
  letter-spacing: 0.12em;
  color: var(--ink-faint);

  span {
    position: absolute;
    padding: 6px 10px;
    background: var(--bg);
  }
  span:nth-child(1) { top: -1px; left: -1px; }
  span:nth-child(2) { top: -1px; right: -1px; }
  span:nth-child(3) { bottom: -1px; left: -1px; }
  span:nth-child(4) { bottom: -1px; right: -1px; }
}

.hero__readout {
  color: var(--accent);
  font-variant-numeric: tabular-nums;
}

.hero__content {
  position: relative;
  z-index: 1;
}

.hero__name {
  font-size: clamp(64px, 13vw, 168px);
  line-height: 0.88;
  letter-spacing: -0.045em;
  font-weight: 700;
  margin: 0 0 28px;
}

.hero__dot {
  color: var(--pin);
}

.hero__pitch {
  max-width: 34ch;
  font-size: clamp(18px, 2vw, 22px);
  color: var(--ink-muted);
  margin: 0 0 32px;
  text-wrap: pretty;

  strong {
    color: var(--ink);
    font-weight: 500;
  }
}

.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 56px;
}

.btn {
  font-family: var(--font-mono);
  font-size: 14px;
  text-decoration: none;
  padding: 12px 20px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: color-mix(in srgb, var(--bg) 80%, transparent);
  transition: transform 0.2s, border-color 0.2s;

  &:hover {
    transform: translateY(-2px);
    border-color: var(--accent);
  }
}

.btn--primary {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--bg);
  font-weight: 700;
}

.hero__stats {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(24px, 5vw, 64px);
  margin: 0;
}

.stat {
  dt {
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-faint);
  }
  dd {
    margin: 4px 0 0;
    font-size: 36px;
    font-weight: 500;
  }
}

.hero__pin {
  position: absolute;
  right: 22%;
  top: 46%;
  width: 0;
  height: 0;
}

.hero__pin-dot {
  position: absolute;
  width: 14px;
  height: 14px;
  left: -7px;
  top: -7px;
  border-radius: 50%;
  background: var(--pin);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--pin) 30%, transparent);
}

.hero__pin-ring {
  position: absolute;
  width: 120px;
  height: 120px;
  left: -60px;
  top: -60px;
  border-radius: 50%;
  border: 1px solid var(--pin);
  animation: ping 2.8s ease-out infinite;
}

.hero__pin-label {
  position: absolute;
  left: 16px;
  top: -24px;
  font-size: 10px;
  letter-spacing: 0.14em;
  color: var(--pin);
  white-space: nowrap;
}

@keyframes ping {
  from { transform: scale(0.1); opacity: 1; }
  to { transform: scale(1); opacity: 0; }
}

@media (max-width: 900px) {
  .hero__pin {
    display: none;
  }
}

@media (max-width: 600px) {
  .hero__frame span:nth-child(2),
  .hero__frame span:nth-child(4) {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__pin-ring {
    animation: none;
    opacity: 0.4;
  }
}
</style>
