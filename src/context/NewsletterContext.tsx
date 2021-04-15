import React, { createContext, useContext, useState } from 'react'

const DEFAULT_VALUE = {
  isOpen: false,
  setIsOpen: (val: boolean) => {}
}

interface NewsletterContextValue {
  isOpen: boolean
  setIsOpen: any
}

const NewsletterContext = createContext<NewsletterContextValue>(DEFAULT_VALUE)

const useNewsLetterContext = () => useContext(NewsletterContext)

const NewsLetterContextProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const value = {
    isOpen,
    setIsOpen
  }

  return (
    <NewsletterContext.Provider value={value}>
      {children}
    </NewsletterContext.Provider>
  )
}

export { useNewsLetterContext, NewsLetterContextProvider }
