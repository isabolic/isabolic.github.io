<script setup lang="ts">
import { archive, layers, projects, type LayerId } from '../data/cv'

const props = defineProps<{ active: LayerId[] }>()

const layerById = Object.fromEntries(layers.map((l) => [l.id, l]))

const kindLabel = { gis: 'GIS', realtime: 'Real-time' }

function matches(projectLayers: LayerId[]) {
  return props.active.length === 0 || projectLayers.some((l) => props.active.includes(l))
}
</script>

<template>
  <section id="projects" class="section">
    <div class="wrap">
      <p v-reveal class="eyebrow">03 · Landmarks</p>
      <h2 v-reveal class="title">Projects worth a pin.</h2>
      <p v-reveal class="lede">
        The bigger landmarks along the route: platforms with real users, real-time data and more than one app talking
        to each other.
      </p>

      <div class="landmarks">
        <article
          v-for="(project, i) in projects"
          :key="project.id"
          v-reveal
          class="landmark"
          :class="{ 'is-dimmed': !matches(project.layers) }"
        >
          <header class="landmark__head mono">
            <span class="landmark__pin">◆ {{ String.fromCharCode(65 + i) }}</span>
            <span v-if="project.client">{{ project.client }}</span>
          </header>

          <h3 class="landmark__name">
            <a v-if="project.link" :href="project.link" target="_blank" rel="noopener">{{ project.name }} ↗</a>
            <template v-else>{{ project.name }}</template>
          </h3>
          <p class="landmark__summary">{{ project.summary }}</p>

          <ul v-if="project.highlights" class="landmark__list">
            <li v-for="item in project.highlights" :key="item">{{ item }}</li>
          </ul>

          <div class="landmark__chips">
            <span
              v-for="id in project.layers"
              :key="id"
              class="landmark__layer"
              :style="{ '--c': layerById[id].color }"
              :title="layerById[id].label"
            />
            <span v-for="tech in project.stack" :key="tech" class="chip">{{ tech }}</span>
          </div>
        </article>
      </div>

      <div v-reveal class="legend">
        <h3 class="legend__title mono">Legend · GIS & real-time archive</h3>
        <ul class="legend__list">
          <li v-for="item in archive" :key="item.id" class="legend__row">
            <span class="legend__symbol" :class="`legend__symbol--${item.kind}`" :title="kindLabel[item.kind]" />
            <span class="legend__name">{{ item.name }}</span>
            <span class="legend__summary">{{ item.summary }}</span>
            <span class="legend__stack mono">{{ item.stack.join(' · ') }}</span>
          </li>
        </ul>
        <p class="legend__key mono">
          <span><span class="legend__symbol legend__symbol--gis" /> GIS</span>
          <span><span class="legend__symbol legend__symbol--realtime" /> Real-time</span>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.landmarks {
  margin-top: 56px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 440px), 1fr));
  gap: 20px;
}

.landmark {
  display: flex;
  flex-direction: column;
  padding: 26px 28px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--bg-raised);
  transition: opacity 0.4s, filter 0.4s, border-color 0.3s, transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);

  &:hover {
    border-color: color-mix(in srgb, var(--accent) 50%, var(--line));
  }

  &.is-dimmed {
    opacity: 0.22;
    filter: grayscale(1);
  }
}

.landmark__head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-faint);
}

.landmark__pin {
  color: var(--pin);
  font-weight: 700;
}

.landmark__name {
  margin: 18px 0 10px;
  font-size: 28px;
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.15;

  a {
    text-decoration: none;

    &:hover {
      color: var(--accent);
    }
  }
}

.landmark__summary {
  margin: 0 0 14px;
  color: var(--ink-muted);
  text-wrap: pretty;
}

.landmark__list {
  margin: 0 0 18px;
  padding: 0;
  list-style: none;
  font-size: 15px;

  li {
    padding-left: 20px;
    position: relative;

    &::before {
      content: '↳';
      position: absolute;
      left: 0;
      color: var(--ink-faint);
    }
  }
}

.landmark__chips {
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.landmark__layer {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  background: var(--c);
}

.landmark__layer:last-of-type {
  margin-right: 6px;
}

.legend {
  margin-top: 64px;
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 24px 28px;
}

.legend__title {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
}

.legend__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.legend__row {
  display: grid;
  grid-template-columns: 16px minmax(180px, 1fr) 2fr minmax(180px, 1.2fr);
  gap: 16px;
  align-items: baseline;
  padding: 14px 0;
  border-bottom: 1px dashed var(--line);
  font-size: 15px;

  &:last-child {
    border-bottom: 0;
  }
}

.legend__symbol {
  display: inline-block;
  width: 10px;
  height: 10px;

  &--gis {
    background: #e8c547;
    transform: rotate(45deg);
  }

  &--realtime {
    border: 2px solid var(--pin);
    border-radius: 50%;
  }
}

.legend__name {
  font-weight: 500;
}

.legend__summary {
  color: var(--ink-muted);
}

.legend__stack {
  font-size: 12px;
  color: var(--ink-faint);
}

.legend__key {
  display: flex;
  gap: 20px;
  margin: 16px 0 0;
  font-size: 11px;
  color: var(--ink-faint);

  > span {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}

@media (max-width: 760px) {
  .legend__row {
    grid-template-columns: 16px 1fr;
    gap: 4px 12px;
  }

  .legend__summary,
  .legend__stack {
    grid-column: 2;
  }
}
</style>
