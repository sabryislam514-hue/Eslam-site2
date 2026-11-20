import { useState } from 'react'

export default function ImageWithFallback({ src, alt = '', style, fallback = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80' }) {
  const [err, setErr] = useState(false)
  return <img src={err || !src ? fallback : src} alt={alt} style={style} onError={() => setErr(true)} loading="lazy" />
}