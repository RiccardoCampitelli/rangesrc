import { useEffect, useRef } from 'react'

type AnyFunction = (...args: any[]) => any

export function useEventListener(
  eventName: string,
  handler: AnyFunction,
  element: any = window
) {
  const savedHandler = useRef<AnyFunction | null>(null)

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    // if ()
    const isSupported = element && element.addEventListener
    if (!isSupported) return

    const eventListener = (event: any) =>
      savedHandler.current && savedHandler.current(event)

    element.addEventListener(eventName, eventListener)

    return () => {
      element.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element])
}
