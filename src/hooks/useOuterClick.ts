import { useEffect } from 'react'

export const useOuterClick = (onOuterClick: any, innerRef: any) => {
  useEffect(
    () => {
      const handleClick = (e: any) => {
        // eslint-disable-next-line no-unused-expressions
        innerRef.current &&
          !innerRef.current.contains(e.target) &&
          onOuterClick(e)
      }

      // only add listener, if the element exists
      if (innerRef.current) {
        document.addEventListener('click', handleClick)
      }

      // unmount previous first in case inputs have changed
      return () => document.removeEventListener('click', handleClick)
    },
    [onOuterClick, innerRef] // invoke again, if inputs have changed
  )
}
