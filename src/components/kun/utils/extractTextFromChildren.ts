import type { JSX } from 'solid-js'

export const extractTextFromChildren = (children: JSX.Element): string => {
  if (typeof children === 'string') return children
  if (typeof children === 'number') return String(children)
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join('')
  }
  return ''
}
