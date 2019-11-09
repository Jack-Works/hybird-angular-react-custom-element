type PropsEventToCustomEvent<U> = {
  [key in keyof U]: U[key] extends (...args: infer Args) => void ? Args : never
}
type EventsOfComponent<T> = T extends React.ComponentType<infer U> ? OmitNever<PropsEventToCustomEvent<U>> : never
type ReactComponentProps<T> = T extends React.ComponentType<infer U> ? U : never
type OmitNever<T> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends never ? never : K
  }[keyof T]
>
