<script setup lang="ts">
const notes = [
  {
    code: 'N-01',
    title: 'Web Components at scale',
    body: 'Vue 3 Composition API components that drop into any host page. Pharmacy features built once, embedded everywhere.',
    tags: ['Vue 3', 'Nuxt', 'Pinia', 'Custom Elements'],
  },
  {
    code: 'N-02',
    title: 'Maps & real-time',
    body: 'A decade of GIS: OpenLayers, GeoServer and PostGIS, plus live data over WebSockets and socket.io for telemetry dashboards.',
    tags: ['OpenLayers', 'GeoServer', 'PostGIS', 'WebSockets'],
  },
  {
    code: 'N-03',
    title: 'Leading frontend teams',
    body: 'Built and ran a frontend department: structure, task distribution, hiring plans and the CI/CD that keeps everyone shipping.',
    tags: ['Team lead', 'CI/CD', 'Docker', 'Azure / AWS'],
  },
  {
    code: 'N-04',
    title: 'AI-assisted engineering',
    body: 'Claude and an MCP server in the daily loop: automating workflows and giving the model the right code context.',
    tags: ['Claude', 'MCP', 'Automation'],
  },
]
</script>

<template>
  <section id="notes" class="section">
    <div class="wrap">
      <p v-reveal class="eyebrow">04 · Field notes</p>
      <h2 v-reveal class="title">What I bring to the expedition.</h2>

      <div class="notes">
        <article v-for="(note, i) in notes" :key="note.code" v-reveal class="note" :style="{ transitionDelay: `${i * 80}ms` }">
          <span class="note__code mono">{{ note.code }}</span>
          <h3>{{ note.title }}</h3>
          <p>{{ note.body }}</p>
          <div class="note__tags">
            <span v-for="tag in note.tags" :key="tag" class="chip">{{ tag }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.notes {
  margin-top: 56px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: 16px;
  overflow: hidden;
}

.note {
  background: var(--bg);
  padding: 32px 28px;
  position: relative;
  transition: background 0.3s;

  &:hover {
    background: var(--bg-raised);
  }

  h3 {
    font-size: 22px;
    font-weight: 500;
    margin: 28px 0 10px;
  }

  p {
    color: var(--ink-muted);
    margin: 0 0 20px;
    font-size: 15px;
    text-wrap: pretty;
  }
}

.note__code {
  font-size: 11px;
  color: var(--accent);
  letter-spacing: 0.12em;
}

.note__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
</style>
