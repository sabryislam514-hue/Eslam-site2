export default function StatCard({ label, value, sub, color = '#7C5CFF', icon }) {
  return (
    <div className="card" style={{ padding: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="muted" style={{ fontSize: 13, fontWeight: 700 }}>{label}</span>
        <span style={{ width: 38, height: 38, borderRadius: 10, display: 'grid', placeItems: 'center', background: color + '22', color }}>{icon}</span>
      </div>
      <div style={{ fontSize: 28, fontWeight: 900, margin: '8px 0 2px' }}>{value}</div>
      {sub && <div className="muted" style={{ fontSize: 12 }}>{sub}</div>}
    </div>
  )
}