export default function CheckBox({ label, checked, id, className }) {
  return (
    <label className={className} style={{ display: 'block' }}>
      <input type="checkbox" checked={checked} id={id} />
      <span className="ipe-checkbox-box"></span>
      <span>{label}</span>
    </label>
  )
}
