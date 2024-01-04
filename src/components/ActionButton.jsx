/**
 *
 * @param {{ type: 'primary' | 'secondary' | 'danger'; href?: string }} param0
 * @returns
 */
export default function ActionButton({ type, href, children }) {
  href = href || link
  const btn = (
    <button className={['btn', type ? `btn-${type}` : '']}>{children}</button>
  )

  if (href) {
    const anchor = (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} />
    )
    anchor.append(btn)
    return anchor
  } else {
    return btn
  }
}
