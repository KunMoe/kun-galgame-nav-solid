import {
  type JSX,
  type ParentComponent,
  createMemo,
  splitProps,
  Show
} from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { useRipple } from './ripple/useRipple'
import { cn } from '~/utils/cn'
import { withDefaults } from '~/utils/withDefaults'
import { KunRipple } from './ripple/Ripple'
import type { KunUIColor } from './type'

export interface KunCardProps extends JSX.HTMLAttributes<HTMLDivElement> {
  isHoverable?: boolean
  isPressable?: boolean
  isTransparent?: boolean
  bordered?: boolean
  cornerDecoration?: boolean
  class?: string
  contentClass?: string
  href?: string
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  color?: KunUIColor | 'background'
  darkBorder?: boolean
  header?: JSX.Element
  cover?: JSX.Element
  footer?: JSX.Element
}

export const KunCard: ParentComponent<KunCardProps> = (props) => {
  const merged = withDefaults(props, {
    isPressable: false,
    isHoverable: true,
    isTransparent: true,
    bordered: true,
    cornerDecoration: true,
    href: '/',
    rounded: 'none',
    color: 'background',
    darkBorder: false
  })

  const [local, others] = splitProps(merged, [
    'isHoverable',
    'isPressable',
    'isTransparent',
    'bordered',
    'cornerDecoration',
    'class',
    'contentClass',
    'href',
    'rounded',
    'color',
    'darkBorder',
    'header',
    'cover',
    'footer',
    'children',
    'onClick'
  ])

  const { ripples, createRipple } = useRipple()

  const handleKunCardClick = (event: MouseEvent) => {
    if (local.isPressable) {
      createRipple(event)
    }

    if (typeof local.onClick === 'function') {
      ;(local.onClick as (e: MouseEvent) => void)(event)
    }
  }

  const colorClasses: Record<KunUIColor | 'background', string> = {
    background: 'bg-background',
    default: 'bg-default-100/70',
    kun: 'bg-kun/30 border-kun',
    ren: 'bg-ren/30 border-ren'
  }

  const roundedClasses = createMemo(() => {
    switch (local.rounded) {
      case 'none':
        return 'rounded-none'
      case 'sm':
        return 'rounded-sm'
      case 'md':
        return 'rounded-md'
      case 'lg':
        return 'rounded-lg'
      case 'full':
        return 'rounded-full'
      default:
        return 'rounded-none'
    }
  })

  return (
    <Dynamic
      component={local.isPressable ? 'a' : 'div'}
      class={cn(
        'border-default-200 relative flex flex-col gap-3 border p-3 transition-all duration-200',
        local.isHoverable && 'hover:border-kun/50 hover:bg-default-50',
        local.isPressable &&
          'cursor-pointer overflow-hidden active:scale-[0.98]',
        !local.isTransparent
          ? colorClasses[local.color!]
          : 'bg-transparent',
        roundedClasses(),
        local.class
      )}
      href={local.isPressable ? local.href : undefined}
      onClick={handleKunCardClick}
      {...others}
    >
      {/* Corner decorations */}
      <Show when={local.cornerDecoration}>
        <div class="border-kun/40 pointer-events-none absolute top-0 left-0 z-10 h-4 w-4 border-t-2 border-l-2" />
        <div class="border-kun/40 pointer-events-none absolute top-0 right-0 z-10 h-4 w-4 border-t-2 border-r-2" />
        <div class="border-ren/40 pointer-events-none absolute bottom-0 left-0 z-10 h-4 w-4 border-b-2 border-l-2" />
        <div class="border-ren/40 pointer-events-none absolute right-0 bottom-0 z-10 h-4 w-4 border-r-2 border-b-2" />
      </Show>

      <Show when={local.header}>
        <div>{local.header}</div>
      </Show>

      <Show when={local.cover}>
        <div class="w-full">{local.cover}</div>
      </Show>

      <div
        class={cn(
          'flex h-full flex-col justify-between gap-1',
          local.contentClass
        )}
      >
        {local.children}
      </div>

      <Show when={local.footer}>
        <div class="bg-default-100 border-t px-3 py-2">{local.footer}</div>
      </Show>

      <Show when={local.isPressable}>
        <KunRipple ripples={ripples()} />
      </Show>
    </Dynamic>
  )
}
