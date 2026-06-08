import { type ParentComponent, type JSX, splitProps } from 'solid-js'
import { A } from '@solidjs/router'
import type { KunUIColor, KunUISize } from './type'
import { cn } from '~/utils/cn'
import { LucideExternalLink } from '~/components/kun/icons'

export interface KunLinkProps extends Record<string, any> {
  to?: string
  color?: KunUIColor | 'foreground'
  underline?: 'none' | 'hover' | 'always'
  size?: KunUISize
  class?: string
  rel?: string
  target?: '_self' | '_blank' | '_parent' | '_top'
  isShowAnchorIcon?: boolean
  prefix?: JSX.Element
  suffix?: JSX.Element
}

const colorClasses: Record<
  Exclude<KunLinkProps['color'], undefined>,
  string
> = {
  default: 'text-foreground',
  foreground: 'text-foreground',
  kun: 'text-kun',
  ren: 'text-ren'
}

const sizeClasses: Record<KunUISize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl'
}

const underlineMap = {
  none: '',
  hover: 'hover:underline underline-offset-3',
  always: 'underline underline-offset-3'
} as const

export const KunLink: ParentComponent<KunLinkProps> = (allProps) => {
  const [props, others] = splitProps(allProps, [
    'to',
    'color',
    'underline',
    'size',
    'class',
    'rel',
    'target',
    'isShowAnchorIcon',
    'prefix',
    'suffix',
    'children'
  ])

  const useRouter = !!props.to && props.to.startsWith('/')
  const className = cn(
    'inline-flex flex-wrap items-center gap-2 break-all',
    underlineMap[props.underline ?? 'always'],
    sizeClasses[props.size ?? 'md'],
    colorClasses[props.color ?? 'kun'],
    props.class
  )

  const content = (
    <>
      {props.prefix}
      {props.children}
      {props.isShowAnchorIcon && <LucideExternalLink />}
      {props.suffix}
    </>
  )

  if (useRouter) {
    return (
      <A
        href={props.to!}
        class={className}
        rel={props.rel}
        target={props.target}
        {...others}
      >
        {content}
      </A>
    )
  }
  return (
    <a
      href={props.to}
      class={className}
      rel={props.rel}
      target={props.target}
      {...others}
    >
      {content}
    </a>
  )
}
