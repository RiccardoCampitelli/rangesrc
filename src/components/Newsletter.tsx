import React, { useRef } from 'react'
import { useTimeout } from 'src/hooks/useTimeout'
import { getColor, getSpace } from 'src/styles/theme'
import styled, { keyframes } from 'styled-components'
// @ts-ignore
import rainLoop from 'src/images/rain-loop.gif'
import { useNewsLetterContext } from 'src/context/NewsletterContext'

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
`

const Newsletter = () => {
  const modalContentRef = useRef<HTMLDivElement>(null)
  const { isOpen, setIsOpen } = useNewsLetterContext()

  useTimeout(() => {
    setIsOpen(true)
  }, 1000)

  return (
    <Modal
      open={isOpen}
      onClick={evt => {
        evt.stopPropagation()
        setIsOpen(false)
      }}
    >
      <ModalContent ref={modalContentRef}>
        <Heading>IT'S RANGES SEASON! </Heading>
        <GifImage src={rainLoop} alt="rain-loop gif" />
        <Heading>SIGN UP TO GET THE FULL SCOOP</Heading>
        <Input type="email" placeholder="email@address.com" />
        <button type="submit" onClick={() => setIsOpen(false)}>
          Join!
        </button>
      </ModalContent>
    </Modal>
  )
}

export { Newsletter }
