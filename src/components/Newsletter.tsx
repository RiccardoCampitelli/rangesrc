import React, { FormEvent, useEffect, useState } from 'react'
import { useTimeout } from 'src/hooks/useTimeout'
import { getColor, getSpace } from 'src/styles/theme'
import styled from 'styled-components'
// @ts-ignore
import rainLoop from 'src/images/rain-loop.gif'
import { useNewsLetterContext } from 'src/context/NewsletterContext'
import addToMailchimp from 'gatsby-plugin-mailchimp'

import { Modal, ModalContent } from './Modal'

const GifImage = styled.img`
  height: 200px;
  user-select: none;
`

const Heading = styled.h3`
  text-align: center;
  user-select: none;
`

const Input = styled.input`
  margin-top: ${getSpace(2)};
  margin-bottom: ${getSpace(2)};
  padding: ${getSpace(1)};

  border-radius: 5px;
  border: 1px solid ${getColor('neutralDarker')};

  &:focus {
    outline: none;
  }
`

const Button = styled.button`
  margin-top: ${getSpace(2)};
  margin-bottom: ${getSpace(2)};
  padding: ${getSpace(1)};

  cursor: pointer;
  font-weight: bold;
  border-top: 1px solid ${getColor('neutralDarker')};
  border-right: 1px solid ${getColor('neutralDarker')};
  border-bottom: 1px solid ${getColor('neutralDarker')};
  border-left: 1px solid ${getColor('neutralDarker')};
  margin-left: ${getSpace(1)};
  border-radius: 5px;
`

interface MessageProps {
  success?: boolean
}

const ErrorMessage = styled.p<MessageProps>`
  min-height: 1rem;
  color: ${props =>
    props?.success ? getColor('positive')(props) : getColor('negative')(props)};
`
interface MailchimpResponse {
  success: boolean
}

const MS_PER_DAY = 1000 * 60 * 60 * 24

function dateDiffInDays(a: Date, b: Date) {
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

  return Math.floor((utc2 - utc1) / MS_PER_DAY)
}

const INITIAL_DELAY = 30000

const SHOW_NEWSLETTER_AFTER_DAYS = 7

const Newsletter = () => {
  const { newsLetterState, setNewsLetterState } = useNewsLetterContext()
  const [email, setEmail] = useState('')
  const [
    mailchimpResponse,
    setMailchimpResponse
  ] = useState<MailchimpResponse | null>(null)

  useTimeout(() => {
    const now = new Date()
    if (newsLetterState.updatedAt == null) {
      setNewsLetterState({
        value: true,
        updatedAt: now.toISOString()
      })
      return
    }

    const differenceInDays = dateDiffInDays(
      new Date(newsLetterState.updatedAt),
      now
    )

    if (differenceInDays > SHOW_NEWSLETTER_AFTER_DAYS)
      setNewsLetterState({
        value: true,
        updatedAt: now
      })
  }, INITIAL_DELAY)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const result = await addToMailchimp(email)

    if (result.result === 'success') {
      setMailchimpResponse({
        success: true
      })
    }

    if (result.result === 'error') {
      setMailchimpResponse({
        success: false
      })
    }
  }

  useEffect(() => {
    if (mailchimpResponse?.success)
      setTimeout(() => {
        setNewsLetterState((curr: any) => ({ ...curr, value: false }))
      }, 3000)
  }, [mailchimpResponse])

  return (
    <Modal
      open={newsLetterState.value}
      onClick={() => {
        setNewsLetterState((curr: any) => ({ ...curr, value: false }))
      }}
    >
      <ModalContent
        onClick={() =>
          setNewsLetterState((curr: any) => ({ ...curr, value: false }))
        }
        height="500px"
        width="500px"
      >
        <Heading>IT'S RANGES SEASON! </Heading>
        <GifImage src={rainLoop} alt="rain-loop gif" />
        <Heading>SIGN UP TO GET THE FULL SCOOP</Heading>
        <form onSubmit={handleSubmit}>
          <Input
            value={email}
            onChange={evt => setEmail(evt.target.value)}
            type="email"
            placeholder="email@address.com"
          />
          <Button type="submit">Join!</Button>
        </form>
        <ErrorMessage success={mailchimpResponse?.success}>
          {mailchimpResponse?.success === false &&
            'Something went wrong setting this up 😢'}
          {mailchimpResponse?.success === true &&
            `We've added you to our mailing list ✌️`}
        </ErrorMessage>
      </ModalContent>
    </Modal>
  )
}

export { Newsletter }
