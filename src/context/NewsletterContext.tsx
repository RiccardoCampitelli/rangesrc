import React, { createContext, useContext, useState } from 'react'
import { useLocalStorage } from 'src/hooks/useLocalstorage'

const DEFAULT_VALUE = {
  newsLetterState: { value: false, updatedAt: null },
  setNewsLetterState: (val: boolean) => {}
}

interface NewsletterContextValue {
  newsLetterState: NewsLetterState
  setNewsLetterState: any
}

const NewsletterContext = createContext<NewsletterContextValue>(DEFAULT_VALUE)

const useNewsLetterContext = () => useContext(NewsletterContext)

interface NewsLetterState {
  value: boolean
  updatedAt: string | null
}

const INITIAL_STATE: NewsLetterState = {
  value: false,
  updatedAt: null
}

const NewsLetterContextProvider: React.FC = ({ children }) => {
  const [newsLetterState, setNewsLetterState] = useLocalStorage(
    'newsletter',
    INITIAL_STATE
  )

  const contextValue = {
    newsLetterState,
    setNewsLetterState
  }

  return (
    <NewsletterContext.Provider value={contextValue}>
      {children}
    </NewsletterContext.Provider>
  )
}

export { useNewsLetterContext, NewsLetterContextProvider }
