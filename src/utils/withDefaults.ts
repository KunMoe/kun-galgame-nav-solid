import { mergeProps } from 'solid-js'

type WithDefaults<P, D> = P & Required<Pick<P, Extract<keyof P, keyof D>>>

/**
 * A helper function similar to Vue's withDefaults, using Solid's mergeProps.
 * It provides default values for props and enhances type inference.
 *
 * @param props The original props object from the component.
 * @param defaults An object containing the default values.
 * @returns A new reactive props object with defaults applied.
 */
export const withDefaults = <P extends object, D extends Partial<P>>(
  props: P,
  defaults: D
): WithDefaults<P, D> => {
  return mergeProps(defaults, props) as WithDefaults<P, D>
}
