import {component$, useVisibleTask$, Slot} from '@builder.io/qwik'
import {useLocation, type RouteLocation} from '@builder.io/qwik-city'

const FORWARD_PARAMETERS = [
  'utm_source',
  'utm_campaign',
]

function generateSessionId () {
  const n = Math.floor((36 ** 6) * Math.random())
  let s = n.toString(36)
  for (let i = s.length; i < 6; i++) {
    s = '0' + s
  }
  return s.substring(0, 6)
}

function compileParameters (location: RouteLocation, sessionId: string, doc: Document): string {
  const pairs = [
    `t=${Date.now()}`,
    `sid=${sessionId}`,
    `path=${encodeURIComponent(location.url.pathname)}`,
  ]
  const referrer = doc.referrer
  if (referrer.length > 0 && !referrer.includes(`//${doc.location.host}/`)) {
    pairs.push(`referrer=${encodeURIComponent(referrer)}`)
  }
  for (const parameterName of FORWARD_PARAMETERS) {
    const value = location.url.searchParams.get(parameterName)
    if (value) {
      pairs.push(`${parameterName}=${encodeURIComponent(value)}`)
    }
  }
  return pairs.join('&')
}

export default component$(() => {
  const sessionId = generateSessionId()
  const location = useLocation()
  useVisibleTask$(({track}) => {
    track(() => location.url.href)
    const doc = window.document
    const src = `/analytics.js?${compileParameters(location, sessionId, doc)}`
    const script = doc.createElement('script')
    script.setAttribute('src', src)
    script.setAttribute('async', 'async')
    script.addEventListener('load', () => doc.body.removeChild(script))
    doc.body.appendChild(script)
  })
  return (<Slot />)
})
