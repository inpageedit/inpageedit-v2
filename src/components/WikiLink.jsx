/**
 * @param {{ title: string; params: Record<string, string> }} param0
 */
export default function WikiLink({ title, params, children }) {
  const href = mw.util.getUrl(title, params)
  return <a href={href}>{children || title}</a>
}
