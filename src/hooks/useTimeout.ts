import { useRef, useEffect } from 'react'

type AnyFunction = (...args: any[]) => any

const useTimeout = (callback: AnyFunction, delay: number) => {
  const savedCallback = useRef<AnyFunction>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => {
      if (savedCallback.current !== undefined) {
        savedCallback.current()
      }
    }
    if (delay !== null) {
      const id = setTimeout(tick, delay)
      return () => clearTimeout(id)
    }
  }, [delay])
}

export { useTimeout }
