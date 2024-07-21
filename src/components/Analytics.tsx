import {useRef, useEffect} from 'react'
import {useLocation} from 'react-router-dom'

function generateSessionId(): string {
  const n = Math.floor((36 ** 6) * Math.random())
  let s = n.toString(36)
  for (let i = s.length; i < 6; i++) {
    s = '0' + s
  }
  return s.substring(0, 6)
}

function createAnalyticsUrl(doc: Document, sessionId: string, path: string): string {
  const pairs = [
    `t=${Date.now()}`,
    `sid=${sessionId}`,
    `path=${encodeURIComponent(path)}`,
  ]
  const referrer = doc.referrer
  if (referrer.length > 0 && !referrer.includes(`//${doc.location.host}/`)) {
    pairs.push(`referrer=${encodeURIComponent(referrer)}`)
  }
  return '/analytics.js?' + pairs.join('&')
}

function sendBeaconFallback(doc: Document, url: string): void {
  const script = doc.createElement('script')
  script.setAttribute('src', url)
  script.setAttribute('async', 'async')
  script.addEventListener('load', () => doc.body.removeChild(script))
  doc.body.appendChild(script)
}

function Analytics() {
  const sessionId = useRef(generateSessionId())
  const elementRef = useRef(null as HTMLDivElement | null)
  const location = useLocation()
  useEffect(() => {
    const doc = elementRef.current?.ownerDocument
    if (doc !== undefined) {
      const url = createAnalyticsUrl(doc, sessionId.current, location.pathname)
      if (navigator.sendBeacon !== undefined) {
        navigator.sendBeacon(url)
      } else {
        sendBeaconFallback(doc, url)
      }
    }
  }, [location, sessionId, elementRef])
  return (
    <div ref={elementRef}></div>
  )
}

export default Analytics
