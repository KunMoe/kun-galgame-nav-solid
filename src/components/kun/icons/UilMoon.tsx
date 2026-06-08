import type { Component, JSX } from 'solid-js'

interface IconProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
  class?: string
}

export const UilMoon: Component<IconProps> = (props) => {
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
        d="M21.64 13a1 1 0 0 0-1.05-.14a8.05 8.05 0 0 1-3.37.73a8.15 8.15 0 0 1-8.14-8.1a8.6 8.6 0 0 1 .25-2A1 1 0 0 0 8 2.36a10.14 10.14 0 1 0 14 11.69a1 1 0 0 0-.36-1.05m-9.5 6.69A8.14 8.14 0 0 1 7.08 5.22v.27a10.15 10.15 0 0 0 10.14 10.14a9.8 9.8 0 0 0 2.1-.22a8.11 8.11 0 0 1-7.18 4.32Z"
      />
    </svg>
  )
}
