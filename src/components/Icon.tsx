import React from 'react'

import styled from 'styled-components'

import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from '@fortawesome/react-fontawesome'
import { space, SpaceProps, color, ColorProps } from 'styled-system'
import { AppTheme, getColor } from 'src/styles/theme'

interface IconProps
  extends FontAwesomeIconProps,
    SpaceProps<AppTheme>,
    ColorProps<AppTheme> {}

const Icon: React.FC<IconProps> = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: ${getColor('primary')};
  ${space};
  ${color};
`
export { Icon }
