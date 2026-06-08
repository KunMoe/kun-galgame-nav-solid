import {
  createMemo,
  splitProps,
  Show,
  type JSX,
  type ParentComponent
} from 'solid-js'
import { A } from '@solidjs/router'
import { withDefaults } from '~/utils/withDefaults'
import { useRipple } from './ripple/useRipple'
import { extractTextFromChildren } from './utils/extractTextFromChildren'
import { KunRipple } from './ripple/Ripple'
import { SvgSpinnerRingResize } from './icons'
import { cn } from '~/utils/cn'
import type { KunUIVariant, KunUIColor, KunUISize, KunUIRounded } from './type'

export interface KunButtonProps
  extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: KunUIVariant
  color?: KunUIColor
  size?: KunUISize
  rounded?: KunUIRounded
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  isIconOnly?: boolean
  icon?: JSX.Element
  iconPosition?: 'left' | 'right'
  class?: string
}

export const KunButton: ParentComponent<KunButtonProps> = (props) => {
  const merged = withDefaults(props, {
    variant: 'solid',
    color: 'kun',
    size: 'md',
    rounded: 'none',
    type: 'button',
    disabled: false,
    loading: false,
    fullWidth: false,
    isIconOnly: false,
    iconPosition: 'left'
  })

  const [local, others] = splitProps(merged, [
    'variant',
    'color',
    'size',
    'rounded',
    'loading',
    'fullWidth',
    'isIconOnly',
    'icon',
    'disabled',
    'iconPosition',
    'class',
    'children',
    'onClick'
  ])

  const { ripples, createRipple } = useRipple()

  const handleClick = (event: MouseEvent) => {
    createRipple(event)
    if (typeof local.onClick === 'function') {
      ;(local.onClick as (e: MouseEvent) => void)(event)
    }
  }

  const sizeClasses = createMemo(() => {
    if (local.isIconOnly) {
      switch (local.size) {
        case 'xs':
          return 'p-1'
        case 'sm':
          return 'p-1.5'
        case 'md':
          return 'p-2'
        case 'lg':
          return 'p-2.5'
        case 'xl':
          return 'p-3'
        default:
          return 'p-2'
      }
    }
    switch (local.size) {
      case 'xs':
        return 'text-xs px-2 py-1'
      case 'sm':
        return 'text-sm px-3 py-1.5'
      case 'md':
        return 'text-sm px-4 py-2'
      case 'lg':
        return 'text-base px-5 py-2.5'
      case 'xl':
        return 'text-lg px-6 py-3'
      default:
        return 'text-sm px-4 py-2'
    }
  })

  const colorVariants: Record<KunUIVariant, Record<KunUIColor, string>> = {
    solid: {
      default: 'bg-default',
      kun: 'bg-kun',
      ren: 'bg-ren'
    },
    bordered: {
      default: 'bg-transparent border-default',
      kun: 'bg-transparent border-kun text-kun',
      ren: 'bg-transparent border-ren text-ren'
    },
    light: {
      default: 'bg-transparent hover:bg-default/40',
      kun: 'bg-transparent text-kun hover:bg-kun/20',
      ren: 'bg-transparent text-ren hover:bg-ren/20'
    },
    flat: {
      default: 'bg-default/40 text-default-700',
      kun: 'bg-kun/20 text-kun',
      ren: 'bg-ren/20 text-ren'
    },
    faded: {
      default: 'border-default bg-default-100',
      kun: 'border-default bg-kun text-kun',
      ren: 'border-default bg-ren text-ren'
    },
    shadow: {
      default: 'shadow-lg shadow-default/50 bg-default',
      kun: 'shadow-lg shadow-kun/40 bg-kun',
      ren: 'shadow-lg shadow-ren/40 bg-ren'
    },
    ghost: {
      default: 'border-default',
      kun: 'border-kun text-kun',
      ren: 'border-ren text-ren'
    }
  }

  const variantClasses = createMemo(() => {
    switch (local.variant) {
      case 'solid':
        return 'shadow-sm text-white'
      case 'bordered':
        return 'border-2 bg-transparent'
      case 'light':
        return 'bg-opacity-20 border-transparent'
      case 'flat':
        return 'bg-opacity-20 border-transparent shadow-none'
      case 'faded':
        return 'bg-opacity-10 border-transparent'
      case 'shadow':
        return 'shadow-lg text-white'
      case 'ghost':
        return 'bg-transparent border-transparent shadow-none hover:bg-opacity-10'
      default:
        return 'shadow-sm'
    }
  })

  const colorClasses = createMemo(() => {
    return colorVariants[local.variant]?.[local.color] || ''
  })

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

  const computedAriaLabel = createMemo(() => {
    if (merged['aria-label']) {
      return merged['aria-label']
    }
    return extractTextFromChildren(local.children).trim() || ''
  })

  return (
    <button
      class={cn(
        'relative inline-flex cursor-pointer items-center justify-center gap-1 overflow-hidden font-medium transition-all hover:opacity-80 active:scale-[0.97] disabled:opacity-50',
        sizeClasses(),
        variantClasses(),
        colorClasses(),
        roundedClasses(),
        local.fullWidth && 'w-full',
        (local.disabled || local.loading) && 'cursor-not-allowed',
        local.class
      )}
      {...others}
      disabled={local.disabled || local.loading}
      aria-label={computedAriaLabel()}
      onClick={handleClick}
    >
      <Show when={local.loading}>
        <SvgSpinnerRingResize />
      </Show>

      <Show when={!local.loading}>
        <Show when={local.icon && local.iconPosition === 'left'}>
          <span class="mr-2">{local.icon}</span>
        </Show>
        {local.children}
        <Show when={local.icon && local.iconPosition === 'right'}>
          <span class="ml-2">{local.icon}</span>
        </Show>
      </Show>

      <KunRipple ripples={ripples()} />
    </button>
  )
}

export const KunLinkButton: ParentComponent<
  KunButtonProps & {
    href: string
    target?: '_blank' | '_self' | '_parent' | '_top'
  }
> = (props) => {
  return (
    <A href={props.href} target={props.target} class="inline-flex">
      <KunButton {...props} />
    </A>
  )
}
