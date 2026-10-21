import { ref } from 'vue'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

type Consent = 'granted' | 'denied'

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined
const KEY = 'isabolic:analytics-consent'

/** GA is only built into production deploys that have the GA_ID Actions variable set. */
export const analyticsEnabled = Boolean(GA_ID && import.meta.env.PROD)

export const consent = ref<Consent | null>(readConsent())
export const consentOpen = ref(analyticsEnabled && consent.value === null)

let loaded = false

function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}

function load() {
  if (loaded || !GA_ID) return
  loaded = true

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // gtag.js expects the raw arguments object, not an array
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  window.gtag('js', new Date())
  window.gtag('config', GA_ID)

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)
}

function clearGaCookies() {
  const domains = ['', location.hostname, `.${location.hostname}`]
  for (const name of document.cookie.split(';').map((c) => c.split('=')[0].trim())) {
    if (!name.startsWith('_ga')) continue
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`
    }
  }
}

export function setConsent(value: Consent) {
  consent.value = value
  consentOpen.value = false
  try {
    localStorage.setItem(KEY, value)
  } catch {
    // storage unavailable: the choice holds for this visit only
  }

  if (value === 'granted') {
    load()
  } else if (loaded) {
    window.gtag('consent', 'update', { analytics_storage: 'denied' })
    clearGaCookies()
  }
}

export function initAnalytics() {
  if (analyticsEnabled && consent.value === 'granted') load()
}

export function track(event: string, params?: Record<string, unknown>) {
  if (consent.value === 'granted') window.gtag?.('event', event, params)
}
