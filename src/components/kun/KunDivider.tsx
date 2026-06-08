import { type ParentComponent } from 'solid-js'
import type { KunUIColor } from './type'
import { cn } from '~/utils/cn'

export interface KunDividerProps {
  orientation?: 'horizontal' | 'vertical'
  color?: KunUIColor
  borderStyle?: 'solid' | 'dashed'
  class?: string
}

const colorClasses: Record<KunUIColor, string> = {
  default: 'border-default/20',
  kun: 'border-kun/20',
  ren: 'border-ren/20'
}

export const KunDivider: ParentComponent<KunDividerProps> = (props) => {
  const orientation = props.orientation ?? 'horizontal'
  const borderStyle = props.borderStyle ?? 'solid'
  const color = props.color ?? 'default'

  const hasLabel = !!props.children

  return (
    <div
      class={cn(
        'flex items-center',
        orientation === 'horizontal' ? 'w-full' : 'h-full flex-col',
        props.class
      )}
      role="separator"
    >
      <div
        class={cn(
          orientation === 'horizontal' ? 'w-full border-t' : 'h-full border-l',
          borderStyle === 'dashed' ? 'border-dashed' : 'border-solid',
          colorClasses[color]
        )}
      />
      {hasLabel && (
        <div
          class={cn(
            'text-default-500 text-sm',
            orientation === 'horizontal' ? 'px-4 whitespace-nowrap' : 'py-4'
          )}
        >
          {props.children}
        </div>
      )}
      {hasLabel && (
        <div
          class={cn(
            orientation === 'horizontal'
              ? 'w-full border-t'
              : 'h-full border-l',
            borderStyle === 'dashed' ? 'border-dashed' : 'border-solid',
            colorClasses[color]
          )}
        />
      )}
    </div>
  )
}
