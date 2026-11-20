export default function DataTable({ columns, rows, onEdit, onDelete, emptyText = 'لا توجد بيانات' }) {
  if (!rows?.length) return <div className="card" style={{ padding: 24, textAlign: 'center' }}><p className="muted">{emptyText}</p></div>
  return (
    <div className="card" style={{ overflow: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, minWidth: 640 }}>
        <thead><tr style={{ background: 'rgba(255,255,255,.04)' }}>{columns.map((c) => <th key={c.key} style={{ textAlign: 'right', padding: '12px 14px', color: 'var(--muted)', fontSize: 12 }}>{c.label}</th>)}<th style={{ padding: '12px 14px' }}>إجراءات</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} style={{ borderTop: '1px solid var(--line)' }}>
              {columns.map((c) => <td key={c.key} style={{ padding: '12px 14px' }}>{c.render ? c.render(r) : r[c.key]}</td>)}
              <td style={{ padding: '12px 14px', display: 'flex', gap: 6, whiteSpace: 'nowrap' }}>
                <button className="btn btn-ghost" style={{ padding: '6px 10px', fontSize: 12 }} onClick={() => onEdit?.(r)}>تعديل</button>
                <button className="btn" style={{ padding: '6px 10px', fontSize: 12, background: '#ef444422', color: '#fca5a5', border: '1px solid #ef444433' }} onClick={() => onDelete?.(r)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}