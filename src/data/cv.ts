export type LayerId = 'vue' | 'react' | 'angular' | 'gis' | 'oracle' | 'node' | 'devops' | 'ai' | 'lead'

export interface Layer {
  id: LayerId
  label: string
  color: string
}

export interface Job {
  id: string
  company: string
  role: string
  location: string
  from: string
  to: string | null
  summary: string
  highlights: string[]
  stack: string[]
  layers: LayerId[]
  /** When a layer started later than the job itself (e.g. adopted mid-tenure). */
  layerSince?: Partial<Record<LayerId, string>>
  link?: string
}

export const profile = {
  name: 'Ivan Sabolić',
  handle: 'isabolic',
  role: 'Senior Frontend Engineer',
  location: 'Zagreb, Croatia',
  coords: { lat: 45.815, lon: 15.9819 },
  email: 'sabolic.ivan@gmail.com',
  phone: '+385 99 476 3121',
  github: 'https://github.com/isabolic',
  pitch:
    'Engineering leader and frontend developer with 15+ years of experience building SaaS platforms, real-time web apps, enterprise GIS and IoT telemetry dashboards.',
  languages: [
    { name: 'Croatian', level: 'Native' },
    { name: 'English', level: 'C1 listening · B1 spoken & written' },
  ],
}

export const layers: Layer[] = [
  { id: 'vue', label: 'Vue / Nuxt', color: '#42d392' },
  { id: 'react', label: 'React / RN', color: '#61dafb' },
  { id: 'angular', label: 'Angular', color: '#ff5a76' },
  { id: 'gis', label: 'GIS / Maps', color: '#e8c547' },
  { id: 'oracle', label: 'Oracle / APEX', color: '#ff8a3d' },
  { id: 'node', label: 'Node / NestJS', color: '#9ccc65' },
  { id: 'devops', label: 'CI/CD / Cloud', color: '#b39dff' },
  { id: 'ai', label: 'Claude / MCP', color: '#f2a7d8' },
  { id: 'lead', label: 'Leadership', color: '#f5f5f0' },
]

export const jobs: Job[] = [
  {
    id: 'fourofthem',
    company: 'Four of them',
    role: 'Senior Frontend Developer',
    location: 'Zaprešić, HR',
    from: '2022-12',
    to: null,
    summary:
      'Building the ia.de pharmacy platform: scalable Vue 3 web components that embed pharmacy solutions anywhere, with Claude and MCP built into the team workflow.',
    highlights: [
      'Vue 3 Composition API web components for pharmacy integrations',
      'Node.js / NestJS service: print module, real-time chat (Firebase + WebSockets)',
      'Claude + MCP server for workflow automation and code context',
      'CI/CD pipelines and close Figma collaboration with design',
    ],
    stack: ['Vue 3', 'Nuxt', 'Web Components', 'Pinia', 'TypeScript', 'NestJS', 'Claude', 'MCP', 'Figma', 'SCSS'],
    layers: ['vue', 'node', 'devops', 'ai'],
    layerSince: { ai: '2024-11' },
    link: 'https://ia.de',
  },
  {
    id: 'mantro',
    company: 'Mantro',
    role: 'Senior Frontend Developer',
    location: 'Zagreb, HR',
    from: '2021-05',
    to: '2022-12',
    summary:
      'Designed and built web and mobile products, and owned the CI/CD that shipped both platforms.',
    highlights: [
      'React and React Native apps on a shared MobX architecture',
      'CI/CD pipelines for web and mobile deployments on Azure',
      'UX design for desktop and mobile viewing',
    ],
    stack: ['React', 'React Native', 'MobX', 'Material UI', 'Docker', 'Azure', 'TypeScript'],
    layers: ['react', 'devops'],
  },
  {
    id: 'biss',
    company: 'BISS',
    role: 'Lead Frontend Developer',
    location: 'Zagreb, HR',
    from: '2019-06',
    to: '2021-05',
    summary:
      'Led the frontend department: organisation, task distribution and hiring plans, while still designing and shipping the apps.',
    highlights: [
      'Built and organised the frontend department',
      'Task distribution and human resource planning',
      'Vue + Quasar apps, AngularJS legacy, Dockerised delivery',
    ],
    stack: ['Vue', 'Quasar', 'AngularJS', 'Docker', 'TypeScript', 'SCSS'],
    layers: ['vue', 'angular', 'devops', 'lead'],
  },
  {
    id: 'greyp',
    company: 'Greyp Bikes',
    role: 'Frontend Developer',
    location: 'Sveta Nedelja, HR',
    from: '2018-08',
    to: '2019-06',
    summary:
      'Built application solutions and digital marketing material for the e-bike maker, and maintained greyp.com.',
    highlights: [
      'React + Redux applications with a Strapi / Firebase backend',
      'Maintained greyp.com and digital marketing material',
      'AWS + Docker deployments',
    ],
    stack: ['React', 'Redux', 'Material UI', 'Strapi', 'Firebase', 'AWS', 'Docker'],
    layers: ['react', 'devops'],
    link: 'https://greyp.com',
  },
  {
    id: 'igea',
    company: 'IGEA',
    role: 'Frontend Developer',
    location: 'Zagreb, HR',
    from: '2017-11',
    to: '2018-08',
    summary: 'Built GIS web solutions on Angular and OpenLayers, backed by GeoServer and Oracle.',
    highlights: ['Angular 4 + OpenLayers map clients', 'Spring Boot and PL/SQL on the backend side'],
    stack: ['Angular 4', 'OpenLayers', 'GeoServer', 'Tomcat', 'Oracle', 'Spring Boot', 'Bootstrap'],
    layers: ['angular', 'gis', 'oracle'],
  },
  {
    id: 'bilog-2',
    company: 'BILOG',
    role: 'Oracle APEX Developer',
    location: 'Zagreb, HR',
    from: '2016-01',
    to: '2017-11',
    summary: 'Built Oracle APEX and database solutions, with real-time features over Node.js and socket.io.',
    highlights: ['APEX apps + Jasper reporting', 'Real-time layer with Node.js and socket.io'],
    stack: ['Oracle APEX', 'Oracle DB', 'Jasper', 'Node.js', 'socket.io', 'PL/SQL'],
    layers: ['oracle', 'node'],
  },
  {
    id: 'omnisdata',
    company: 'Omnisdata',
    role: 'Frontend Developer',
    location: 'Zagreb, HR',
    from: '2014-08',
    to: '2016-01',
    summary: 'Built cloud-hosted GIS web solutions.',
    highlights: ['GIS web apps on a cloud platform', 'jQuery + Bootstrap frontends, PHP services'],
    stack: ['jQuery', 'Bootstrap', 'PHP', 'Git'],
    layers: ['gis'],
  },
  {
    id: 'bilog-1',
    company: 'BILOG',
    role: 'Oracle APEX Developer',
    location: 'Zagreb, HR',
    from: '2012-03',
    to: '2014-08',
    summary: 'Built web solutions on Oracle technologies.',
    highlights: ['Oracle APEX web apps', 'Jasper reporting'],
    stack: ['Oracle APEX', 'Oracle DB', 'Jasper', 'PL/SQL'],
    layers: ['oracle'],
  },
  {
    id: 'infomax',
    company: 'Infomax',
    role: 'Frontend Developer',
    location: 'Zagreb, HR',
    from: '2008-06',
    to: '2012-03',
    summary: 'The first map: GIS web solutions with ExtJS and OpenLayers on top of GeoServer and Oracle.',
    highlights: ['ExtJS + OpenLayers GIS clients', 'GeoServer, Tomcat, Oracle backends'],
    stack: ['ExtJS', 'jQuery', 'OpenLayers', 'GeoServer', 'Tomcat', 'Oracle', 'Java'],
    layers: ['gis', 'oracle'],
  },
]

export const education = {
  title: '.NET Developer',
  school: 'Ivora',
  location: 'Zagreb',
  from: '2008-09',
  to: '2009-04',
}

export function toDate(ym: string | null): Date {
  if (!ym) return new Date()
  const [y, m] = ym.split('-').map(Number)
  return new Date(y, m - 1, 1)
}

export function toYear(ym: string | null): number {
  const d = toDate(ym)
  return d.getFullYear() + d.getMonth() / 12
}

export function formatPeriod(from: string, to: string | null): string {
  const fmt = (ym: string) => {
    const [y, m] = ym.split('-')
    return `${m}/${y}`
  }
  return `${fmt(from)} — ${to ? fmt(to) : 'now'}`
}

export function formatDuration(from: string, to: string | null): string {
  const months = Math.round((toYear(to) - toYear(from)) * 12)
  const y = Math.floor(months / 12)
  const m = months % 12
  return [y && `${y}y`, m && `${m}m`].filter(Boolean).join(' ') || '<1m'
}
