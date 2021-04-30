import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { useTimeout } from 'src/hooks/useTimeout'
import { getColor, getSpace } from 'src/styles/theme'
import styled, { keyframes } from 'styled-components'
// @ts-ignore
import rainLoop from 'src/images/rain-loop.gif'
import { useNewsLetterContext } from 'src/context/NewsletterContext'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Icon } from './Icon'

interface ModalProps {
  open: boolean
}

const Modal = styled.div<ModalProps>`
  display: ${props => (props.open ? 'flex' : 'none')};
  flex: 1 1 auto;

  align-items: center;
  justify-content: center;

  position: fixed;
  z-index: 101;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`

const ModalContent = styled.div`
  width: 500px;
  height: 500px;
  position: relative;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: space-evenly;

  border-radius: 10px;

  background-color: ${getColor('primary')};

  animation: ${fadeIn} 0.5s ease-in;
`

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

const CloseButton = styled.button`
  position: absolute;

  top: -5px;
  right: -5px;

  background-color: white;

  border-radius: 50%;
  border: 1px solid white;
  padding: 1rem;
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
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

const INITIAL_DELAY = 10000

const SHOW_NEWSLETTER_AFTER_DAYS = 7

const Newsletter = () => {
  const modalContentRef = useRef<HTMLDivElement>(null)
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
        ref={modalContentRef}
        onClick={evt => evt.stopPropagation()}
      >
        <CloseButton
          onClick={() =>
            setNewsLetterState((curr: any) => ({ ...curr, value: false }))
          }
        >
          <Icon icon={faTimes} />
        </CloseButton>
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
          {mailchimpResponse?.success === true && 'All good ✌️'}
        </ErrorMessage>
      </ModalContent>
    </Modal>
  )
}

export { Newsletter }
