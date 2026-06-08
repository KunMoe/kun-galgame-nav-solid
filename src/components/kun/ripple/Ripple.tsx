import { type Component, For } from 'solid-js'
import { type RippleType } from './useRipple'
import '../styles/kun-ripple.css'

export const KunRipple: Component<{ ripples: RippleType[] }> = (props) => {
  return (
    <For each={props.ripples}>
      {(ripple) => (
        <span
          class="bg-foreground/30 kun-ripple pointer-events-none absolute rounded-full"
          style={{
            width: `${ripple.size}px`,
            height: `${ripple.size}px`,
            top: `${ripple.y}px`,
            left: `${ripple.x}px`
          }}
        />
      )}
    </For>
  )
}
