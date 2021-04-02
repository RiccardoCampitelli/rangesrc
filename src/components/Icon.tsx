import React from 'react'

import styled from 'styled-components'

import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from '@fortawesome/react-fontawesome'
import { space, SpaceProps } from 'styled-system'
import { AppTheme } from 'src/styles/theme'

interface IconProps extends FontAwesomeIconProps, SpaceProps<AppTheme> {}

const Icon: React.FC<IconProps> = styled(FontAwesomeIcon)`
  cursor: pointer;
  ${space}
`
export { Icon }
