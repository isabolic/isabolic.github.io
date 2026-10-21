<script setup lang="ts">
import { computed } from 'vue'
import { track } from '../analytics'
import { jobs, layers, toYear, type LayerId } from '../data/cv'

const active = defineModel<LayerId[]>({ required: true })

const START = 2008
const END = new Date().getFullYear() + 1
const span = END - START

const ticks = Array.from({ length: Math.floor(span / 2) + 1 }, (_, i) => START + i * 2)

const rows = computed(() =>
  layers.map((layer) => {
    const segments = jobs
      .filter((job) => job.layers.includes(layer.id))
      .map((job) => ({
        id: job.id,
        company: job.company,
        from: toYear(job.layerSince?.[layer.id] ?? job.from),
        to: toYear(job.to),
      }))
      .sort((a, b) => a.from - b.from)

    const total = segments.reduce((sum, s) => sum + (s.to - s.from), 0)

    return { ...layer, segments, years: Math.round(total) }
  }),
)

function pos(from: number, to: number) {
  return {
    left: `${((from - START) / span) * 100}%`,
    width: `${((to - from) / span) * 100}%`,
  }
}

function isOn(id: LayerId) {
  return active.value.length === 0 || active.value.includes(id)
}

function toggle(id: LayerId) {
  track('layer_toggle', { layer: id, on: !active.value.includes(id) })
  active.value = active.value.includes(id) ? active.value.filter((l) => l !== id) : [...active.value, id]
}
</script>

<template>
  <section id="strata" class="section">
    <div class="wrap">
      <p v-reveal class="eyebrow">01 · Strata</p>
      <h2 v-reveal class="title">{{ END - 1 - START }} years of sediment.</h2>
      <p v-reveal class="lede">
        Every stack I've worked in, layered over time like a geological core sample. Click a layer to switch it on
        the map below, the same way you'd toggle layers in a GIS client.
      </p>

      <div v-reveal class="strata" :style="{ '--span': span }">
        <div class="strata__axis mono" aria-hidden="true">
          <span v-for="year in ticks" :key="year" :style="{ left: `${((year - START) / span) * 100}%` }">
            ’{{ String(year).slice(2) }}
          </span>
        </div>

        <button
          v-for="row in rows"
          :key="row.id"
          class="strata__row"
          :class="{ 'is-off': !isOn(row.id), 'is-selected': active.includes(row.id) }"
          :style="{ '--c': row.color }"
          :aria-pressed="active.includes(row.id)"
          @click="toggle(row.id)"
        >
          <span class="strata__label">
            <span class="strata__check" />
            {{ row.label }}
          </span>
          <span class="strata__track">
            <span
              v-for="seg in row.segments"
              :key="seg.id"
              class="strata__seg"
              :style="pos(seg.from, seg.to)"
              :title="seg.company"
            />
          </span>
          <span class="strata__years mono">{{ row.years }}y</span>
        </button>

        <button v-if="active.length" class="strata__reset mono" @click="active = []">clear layers ×</button>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.strata {
  margin-top: 56px;
  position: relative;
  display: grid;
  gap: 6px;
}

.strata__axis {
  position: relative;
  height: 24px;
  margin-left: 168px;
  margin-right: 48px;
  font-size: 11px;
  color: var(--ink-faint);

  span {
    position: absolute;
    transform: translateX(-50%);
  }
}

.strata__row {
  all: unset;
  display: grid;
  grid-template-columns: 160px 1fr 40px;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  padding: 4px 0;
  border-radius: 6px;
  transition: opacity 0.3s;

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  &:hover .strata__track {
    background: color-mix(in srgb, var(--c) 8%, transparent);
  }

  &.is-off {
    opacity: 0.28;
  }
}

.strata__label {
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.strata__check {
  width: 12px;
  height: 12px;
  border: 1.5px solid var(--c);
  border-radius: 3px;
  transition: background 0.2s;

  .is-selected & {
    background: var(--c);
  }
}

.strata__track {
  position: relative;
  height: 22px;
  border-radius: 4px;
  background: repeating-linear-gradient(
    90deg,
    transparent 0,
    transparent calc(100% / var(--span) - 1px),
    var(--line) calc(100% / var(--span) - 1px),
    var(--line) calc(100% / var(--span))
  );
  transition: background 0.2s;
}

.strata__seg {
  position: absolute;
  top: 3px;
  bottom: 3px;
  border-radius: 3px;
  background: var(--c);
  background-image: repeating-linear-gradient(
    -45deg,
    transparent 0 4px,
    color-mix(in srgb, var(--bg) 25%, transparent) 4px 6px
  );
}

.strata__years {
  font-size: 12px;
  color: var(--ink-muted);
  text-align: right;
}

.strata__reset {
  justify-self: start;
  margin-top: 12px;
  background: none;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--ink-muted);
  padding: 6px 12px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    color: var(--pin);
    border-color: var(--pin);
  }
}

@media (max-width: 640px) {
  .strata__axis {
    margin-left: 0;
    margin-right: 0;
  }

  .strata__row {
    grid-template-columns: 1fr auto;
    row-gap: 4px;
  }

  .strata__track {
    grid-column: 1 / -1;
    grid-row: 2;
  }
}
</style>
