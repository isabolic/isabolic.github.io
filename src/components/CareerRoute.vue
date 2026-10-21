<script setup lang="ts">
import { education, formatDuration, formatPeriod, jobs, layers, type LayerId } from '../data/cv'

const props = defineProps<{ active: LayerId[] }>()

const layerById = Object.fromEntries(layers.map((l) => [l.id, l]))

function matches(jobLayers: LayerId[]) {
  return props.active.length === 0 || jobLayers.some((l) => props.active.includes(l))
}

function waypoint(index: number) {
  return `WP-${String(jobs.length - index).padStart(2, '0')}`
}
</script>

<template>
  <section id="route" class="section">
    <div class="wrap">
      <p v-reveal class="eyebrow">02 · Route</p>
      <h2 v-reveal class="title">The route so far.</h2>
      <p v-reveal class="lede">
        From GIS clients in ExtJS to Vue 3 web components. Each waypoint is a team, a product and a stack I learned
        on the way.
        <template v-if="active.length">
          Filtered by <strong>{{ active.map((id) => layerById[id].label).join(', ') }}</strong>.
        </template>
      </p>

      <ol class="route">
        <li
          v-for="(job, index) in jobs"
          :key="job.id"
          v-reveal
          class="waypoint"
          :class="{ 'is-dimmed': !matches(job.layers), 'is-current': !job.to }"
        >
          <div class="waypoint__marker" aria-hidden="true">
            <span class="waypoint__dot" />
          </div>

          <div class="waypoint__meta mono">
            <span class="waypoint__id">{{ waypoint(index) }}</span>
            <span>{{ formatPeriod(job.from, job.to) }}</span>
            <span class="waypoint__dist">{{ formatDuration(job.from, job.to) }}</span>
          </div>

          <article class="waypoint__card">
            <header class="waypoint__head">
              <h3>
                <a v-if="job.link" :href="job.link" target="_blank" rel="noopener">{{ job.company }} ↗</a>
                <template v-else>{{ job.company }}</template>
              </h3>
              <span class="waypoint__role">{{ job.role }} · {{ job.location }}</span>
            </header>

            <p class="waypoint__summary">{{ job.summary }}</p>

            <ul class="waypoint__list">
              <li v-for="item in job.highlights" :key="item">{{ item }}</li>
            </ul>

            <div class="waypoint__chips">
              <span
                v-for="id in job.layers"
                :key="id"
                class="waypoint__layer"
                :style="{ '--c': layerById[id].color }"
                :title="layerById[id].label"
              />
              <span v-for="tech in job.stack" :key="tech" class="chip">{{ tech }}</span>
            </div>
          </article>
        </li>

        <li v-reveal class="waypoint waypoint--start">
          <div class="waypoint__marker" aria-hidden="true">
            <span class="waypoint__dot" />
          </div>
          <div class="waypoint__meta mono">
            <span class="waypoint__id">TRAILHEAD</span>
            <span>{{ formatPeriod(education.from, education.to) }}</span>
          </div>
          <article class="waypoint__card">
            <header class="waypoint__head">
              <h3>{{ education.school }}</h3>
              <span class="waypoint__role">{{ education.title }} · {{ education.location }}</span>
            </header>
          </article>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped lang="scss">
.route {
  list-style: none;
  margin: 64px 0 0;
  padding: 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 7px;
    top: 10px;
    bottom: 10px;
    border-left: 2px dashed var(--line);
  }
}

.waypoint {
  position: relative;
  display: grid;
  grid-template-columns: 16px 180px 1fr;
  gap: 0 28px;
  padding-bottom: 48px;
  transition: opacity 0.4s, filter 0.4s, transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);

  &.is-dimmed {
    opacity: 0.22;
    filter: grayscale(1);
  }
}

.waypoint__marker {
  padding-top: 6px;
}

.waypoint__dot {
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--bg);
  border: 2px solid var(--ink-muted);

  .is-current & {
    border-color: var(--pin);
    background: var(--pin);
    box-shadow: 0 0 0 6px color-mix(in srgb, var(--pin) 22%, transparent);
  }

  .waypoint--start & {
    border-radius: 3px;
    border-color: var(--accent);
  }
}

.waypoint__meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 12px;
  color: var(--ink-muted);
  padding-top: 4px;
}

.waypoint__id {
  color: var(--accent);
  font-weight: 700;
  letter-spacing: 0.08em;

  .is-current & {
    color: var(--pin);
  }
}

.waypoint__dist {
  color: var(--ink-faint);
}

.waypoint__card {
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 22px 24px;
  background: var(--bg-raised);
  transition: border-color 0.3s, transform 0.3s;

  &:hover {
    border-color: color-mix(in srgb, var(--accent) 50%, var(--line));
    transform: translateX(4px);
  }
}

.waypoint__head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 14px;
  margin-bottom: 10px;

  h3 {
    margin: 0;
    font-size: 24px;
    font-weight: 500;
    letter-spacing: -0.01em;
  }

  a {
    text-decoration: none;

    &:hover {
      color: var(--accent);
    }
  }
}

.waypoint__role {
  color: var(--ink-muted);
  font-size: 15px;
}

.waypoint__summary {
  margin: 0 0 12px;
  text-wrap: pretty;
}

.waypoint__list {
  margin: 0 0 16px;
  padding: 0;
  list-style: none;
  color: var(--ink-muted);
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

.waypoint__chips {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.waypoint__layer {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  background: var(--c);
}

.waypoint__layer:last-of-type {
  margin-right: 6px;
}

@media (max-width: 760px) {
  .waypoint {
    grid-template-columns: 16px 1fr;
    gap: 8px 18px;
  }

  .waypoint__meta {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 4px 12px;
  }

  .waypoint__card {
    grid-column: 2;
  }
}
</style>
