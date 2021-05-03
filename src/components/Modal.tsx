import { faTimes } from '@fortawesome/free-solid-svg-icons'
import React, { ReactNode } from 'react'
import { AppTheme } from 'src/styles/theme'

import styled, { keyframes } from 'styled-components'
import { layout, LayoutProps } from 'styled-system'
import { Icon } from './Icon'

interface ModalProps {
  open: boolean
}

const ModalBackground = styled.div<ModalProps>`
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

type ModalContentProps = {} & LayoutProps<AppTheme>

const ModalContentContainer = styled.div<ModalContentProps>`
  /* width: 500px;
  height: 500px; */
  /* width: 70%; */
  ${layout}
  position: relative;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: space-evenly;

  border-radius: 10px;

  background-color: white;

  animation: ${fadeIn} 0.5s ease-in;
`

const CloseButton = styled.button`
  position: absolute;

  top: -5px;
  right: -5px;

  &:focus {
    outline: none;
  }

  background-color: white;

  border-radius: 50%;
  border: 1px solid white;
  padding: 1rem;
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

interface ModalProps {
  open: boolean
  onClick?: () => void
  children: ReactNode
}

const Modal = ({ open, onClick = () => {}, children }: ModalProps) => {
  return (
    <ModalBackground onClick={onClick} open={open}>
      {children}
    </ModalBackground>
  )
}

const ModalContent = ({
  onClick,
  children,
  ...props
}: {
  onClick: (evt: any) => void
  children: ReactNode
} & ModalContentProps) => {
  return (
    <ModalContentContainer
      {...props}
      onClick={(evt: any) => evt.stopPropagation()}
    >
      <CloseButton onClick={onClick}>
        <Icon icon={faTimes} />
      </CloseButton>
      {children}
    </ModalContentContainer>
  )
}

export { Modal, ModalContent }
