import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'

export const ListStaticContainer = styled(Typography)`
  position: relative;
  padding: 16px;
  background: red;
  & > ::before {
    font-size: 1.1em;
    line-height: 1;
    content: '\2022';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 7px;
    display: inline-flex;
    align-content: center;
    align-items: center;
    z-index: -1;
  }
`
