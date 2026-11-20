export default function Button({ children, variant = 'primary', style, ...props }) {
  const cls = variant === 'primary' ? 'btn btn-primary' : variant === 'ghost' ? 'btn btn-ghost' : variant === 'whatsapp' ? 'btn btn-whatsapp' : 'btn btn-ghost'
  return <button className={cls} style={style} {...props}>{children}</button>
}