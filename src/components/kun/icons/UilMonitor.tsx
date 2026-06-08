import type { Component, JSX } from 'solid-js'

interface IconProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
  class?: string
}

export const UilMonitor: Component<IconProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M19 2H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2.64l-.58 1a2 2 0 0 0 0 2a2 2 0 0 0 1.75 1h6.46A2 2 0 0 0 17 21a2 2 0 0 0 0-2l-.59-1H19a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3M8.77 20L10 18h4l1.2 2ZM20 15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1h16Zm0-3H4V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"
      />
    </svg>
  )
}
