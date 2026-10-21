<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { formatPeriod, jobs, layers, profile } from '../data/cv'
import { useTheme } from '../composables/useTheme'

const open = defineModel<boolean>({ required: true })

const { toggle: toggleTheme } = useTheme()

interface Line {
  kind: 'in' | 'out' | 'err'
  text: string
}

const input = ref('')
const inputEl = ref<HTMLInputElement | null>(null)
const screenEl = ref<HTMLElement | null>(null)
const history: string[] = []
let historyIndex = 0

const lines = ref<Line[]>([
  { kind: 'out', text: `isabolic.dev shell v2 · type "help" to look around` },
])

const commands: Record<string, { help: string; run: (args: string[]) => string | void }> = {
  help: {
    help: 'list commands',
    run: () =>
      Object.entries(commands)
        .map(([name, c]) => `  ${name.padEnd(10)} ${c.help}`)
        .join('\n'),
  },
  whoami: {
    help: 'who is this guy',
    run: () => `${profile.name} · ${profile.role}\n${profile.pitch}`,
  },
  ls: {
    help: 'list waypoints',
    run: () => jobs.map((j) => `  ${formatPeriod(j.from, j.to).padEnd(20)} ${j.company} — ${j.role}`).join('\n'),
  },
  layers: {
    help: 'list stack layers',
    run: () => layers.map((l) => `  ■ ${l.label}`).join('\n'),
  },
  stack: {
    help: 'what I use right now',
    run: () => jobs[0].stack.join(' · '),
  },
  contact: {
    help: 'how to reach me',
    run: () => `  email  ${profile.email}\n  phone  ${profile.phone}\n  github ${profile.github}`,
  },
  locate: {
    help: 'where am I',
    run: () => `${profile.coords.lat}° N, ${profile.coords.lon}° E · ${profile.location}`,
  },
  theme: {
    help: 'flip between night and paper map',
    run: () => {
      toggleTheme()
      return 'theme toggled'
    },
  },
  sudo: {
    help: 'try it',
    run: (args) =>
      args.join(' ') === 'hire ivan'
        ? `[sudo] permission granted. Opening mail client…`
        : `${args.join(' ') || 'sudo'}: nice try. Hint: sudo hire ivan`,
  },
  clear: {
    help: 'clear screen',
    run: () => {
      lines.value = []
    },
  },
  exit: {
    help: 'close terminal',
    run: () => {
      open.value = false
    },
  },
}

function submit() {
  const raw = input.value.trim()
  input.value = ''
  if (!raw) return
  history.push(raw)
  historyIndex = history.length
  lines.value.push({ kind: 'in', text: raw })

  const [name, ...args] = raw.split(/\s+/)
  const command = commands[name.toLowerCase()]
  if (!command) {
    lines.value.push({ kind: 'err', text: `command not found: ${name}` })
  } else {
    const out = command.run(args)
    if (out) lines.value.push({ kind: 'out', text: out })
    if (name === 'sudo' && args.join(' ') === 'hire ivan') {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Let's work together")}`
    }
  }
  nextTick(() => screenEl.value?.scrollTo({ top: screenEl.value.scrollHeight }))
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'ArrowUp' && historyIndex > 0) {
    historyIndex--
    input.value = history[historyIndex]
    e.preventDefault()
  } else if (e.key === 'ArrowDown') {
    historyIndex = Math.min(historyIndex + 1, history.length)
    input.value = history[historyIndex] ?? ''
    e.preventDefault()
  } else if (e.key === 'Escape') {
    open.value = false
  } else if (e.key === 'Tab') {
    e.preventDefault()
    const match = Object.keys(commands).find((c) => c.startsWith(input.value))
    if (match) input.value = match
  }
}

watch(open, (value) => {
  if (value) nextTick(() => inputEl.value?.focus())
})
</script>

<template>
  <Transition name="term">
    <div v-if="open" class="backdrop" @click.self="open = false">
      <div class="term" role="dialog" aria-label="Terminal" @click="inputEl?.focus()">
        <div class="term__bar">
          <span class="term__dot" style="background: #ff5f57" @click="open = false" />
          <span class="term__dot" style="background: #febc2e" />
          <span class="term__dot" style="background: #28c840" />
          <span class="term__title mono">guest@isabolic.dev: ~</span>
        </div>

        <div ref="screenEl" class="term__screen mono">
          <div v-for="(line, i) in lines" :key="i" :class="`term__line term__line--${line.kind}`">
            <span v-if="line.kind === 'in'" class="term__prompt">➜ ~ </span>{{ line.text }}
          </div>
          <form class="term__input-row" @submit.prevent="submit">
            <span class="term__prompt">➜ ~ </span>
            <input
              ref="inputEl"
              v-model="input"
              class="term__input mono"
              autocomplete="off"
              spellcheck="false"
              aria-label="Command"
              @keydown="onKey"
            />
          </form>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: grid;
  place-items: center;
  padding: 16px;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
}

.term {
  width: min(720px, 100%);
  height: min(460px, 80vh);
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  background: #0a0d0c;
  color: #d8e6d0;
  border: 1px solid #2a3330;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
}

.term__bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: #151a18;
}

.term__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
}

.term__title {
  margin-left: 12px;
  font-size: 12px;
  color: #6f7c76;
}

.term__screen {
  flex: 1;
  overflow-y: auto;
  padding: 14px 16px;
  font-size: 13px;
  line-height: 1.6;
}

.term__line {
  white-space: pre-wrap;
  word-break: break-word;

  &--err {
    color: #ff7a5c;
  }
}

.term__prompt {
  color: #b6f36a;
}

.term__input-row {
  display: flex;
}

.term__input {
  flex: 1;
  background: none;
  border: 0;
  outline: 0;
  color: inherit;
  font-size: 13px;
  caret-color: #b6f36a;
  padding: 0;
}

.term-enter-active,
.term-leave-active {
  transition: opacity 0.2s;

  .term {
    transition: transform 0.25s cubic-bezier(0.2, 0.7, 0.2, 1);
  }
}

.term-enter-from,
.term-leave-to {
  opacity: 0;

  .term {
    transform: translateY(16px) scale(0.98);
  }
}
</style>
