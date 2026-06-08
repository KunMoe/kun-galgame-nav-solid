import { createSignal, onCleanup } from 'solid-js'

export type RippleType = {
  key: number
  x: number
  y: number
  size: number
}

export const useRipple = () => {
  const [ripples, setRipples] = createSignal<RippleType[]>([])
  const timeouts = new Set<ReturnType<typeof setTimeout>>()

  const createRipple = (event: MouseEvent) => {
    const target = event.currentTarget as HTMLElement

    const size = Math.max(target.clientWidth, target.clientHeight)
    const rect = target.getBoundingClientRect()

    const newRipple: RippleType = {
      key: Date.now(),
      size,
      x: event.clientX - rect.left - size / 2,
      y: event.clientY - rect.top - size / 2
    }

    setRipples((prevRipples) => [...prevRipples, newRipple])

    const timeoutId = setTimeout(() => {
      setRipples((prevRipples) => prevRipples.slice(1))
      timeouts.delete(timeoutId)
    }, 600)

    timeouts.add(timeoutId)
  }

  onCleanup(() => {
    timeouts.forEach((timeoutId) => clearTimeout(timeoutId))
    timeouts.clear()
    setRipples([])
  })

  return {
    ripples,
    createRipple
  }
}
