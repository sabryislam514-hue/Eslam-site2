export default function LoadingSpinner({ label = 'جارٍ التحميل...' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: 40 }}>
      <div style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid rgba(255,255,255,.15)', borderTopColor: '#7C5CFF', animation: 'spin .8s linear infinite' }} />
      <span className="muted" style={{ fontSize: 13 }}>{label}</span>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}