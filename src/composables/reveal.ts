import type { Directive } from 'vue'

let observer: IntersectionObserver | undefined

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        (entry.target as HTMLElement).dataset.reveal = 'visible'
        observer?.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  )
  return observer
}

export const vReveal: Directive<HTMLElement> = {
  mounted(el) {
    el.dataset.reveal = ''
    getObserver().observe(el)
  },
  beforeUnmount(el) {
    observer?.unobserve(el)
  },
}
