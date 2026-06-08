import { type Component, type JSX } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { cn } from '~/utils/cn'
import { KunDivider } from './KunDivider'

export interface KunHeaderProps {
  name?: string
  description?: string
  isShowDivider?: boolean
  scale?: 'h1' | 'h2' | 'h3'
  headerEndContent?: JSX.Element
  endContent?: JSX.Element
}

export const KunHeader: Component<KunHeaderProps> = (props) => {
  const headingClass = () => {
    const scaleClasses = {
      h1: 'text-2xl sm:text-3xl',
      h2: 'text-xl sm:text-2xl',
      h3: 'text-lg sm:text-xl'
    }
    return cn('font-medium', scaleClasses[props.scale ?? 'h1'])
  }

  const Tag = props.scale ?? 'h1'

  return (
    <>
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <div class="space-y-2">
            <Dynamic component={Tag} class={headingClass()}>
              {props.name && <span>{props.name}</span>}
            </Dynamic>
            {props.description && (
              <p class="text-default-500 text-sm whitespace-pre-wrap sm:text-base">
                {props.description}
              </p>
            )}
          </div>
          {props.headerEndContent}
        </div>
        {props.endContent}
      </div>
      {props.isShowDivider !== false && <KunDivider />}
    </>
  )
}
