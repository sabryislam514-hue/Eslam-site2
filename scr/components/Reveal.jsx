import useReveal from '../hooks/useReveal.js'

export default function Reveal({ children, style }) {
  useReveal()
  return <div className="reveal" style={style}>{children}</div>
}