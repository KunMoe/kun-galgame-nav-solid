import { cn } from '~/utils/cn'
import { type Component, splitProps } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'

export interface KunImageProps extends JSX.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt?: string
  class?: string
  custom?: boolean
}

export const KunImage: Component<KunImageProps> = (allProps) => {
  const [props, others] = splitProps(allProps, [
    'src',
    'alt',
    'class',
    'custom'
  ])
  return (
    <img src={props.src} alt={props.alt} class={cn(props.class)} {...others} />
  )
}
