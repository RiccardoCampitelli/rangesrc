import { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'
import { useEventListener } from './useEventListener'

type ScreenSize = 'small' | 'medium' | 'large' | 'x-large' | 'unset'

const pxToNumber = (value: string) => parseInt(value.slice(0, -2), 10)

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<ScreenSize>('unset')
  const [windowWidth, setWindowWidth] = useState(0)
  const { breakpoints } = useTheme()

  useEventListener('resize', () => {
    setWindowWidth(window.innerWidth)
  })

  useEffect(() => {
    if (windowWidth < pxToNumber(breakpoints.sm)) setScreenSize('small')

    if (
      windowWidth < pxToNumber(breakpoints.md) &&
      windowWidth > pxToNumber(breakpoints.sm)
    )
      setScreenSize('medium')

    if (
      windowWidth < pxToNumber(breakpoints.lg) &&
      windowWidth > pxToNumber(breakpoints.md)
    )
      setScreenSize('large')

    if (windowWidth > pxToNumber(breakpoints.lg)) setScreenSize('x-large')
  }, [windowWidth])

  return { screenSize }
}

export { useScreenSize }
