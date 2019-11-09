type ArgsToCustomEvent<Args extends any[]> = Args['length'] extends 0
  ? CustomEvent<undefined>
  : Args['length'] extends 1
  ? CustomEvent<Args[0]>
  : CustomEvent<Args>

type PropsEventToCustomEvent<U> = {
  [key in keyof U]: U[key] extends (...args: infer Args) => void ? ArgsToCustomEvent<Args> : never
}
type ReactComponentProps<T> = T extends React.ComponentType<infer U>
  ? {
      [key in keyof U]: U[key] extends (...args: infer Args) => void
        ? ($event: ArgsToCustomEvent<Args>) => void
        : U[key]
    }
  : never
type EventsOfComponent<T> = T extends React.ComponentType<infer U> ? OmitNever<PropsEventToCustomEvent<U>> : never

type AttrsOfComponent<T> = T extends React.ComponentType<infer U> ? U : never
type OmitNever<T> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends never ? never : K
  }[keyof T]
>
