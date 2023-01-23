import styled from '@emotion/styled'
import { Stack } from '@mui/material'

export const ResultItem = styled(Stack)`
  padding: 10px 20px;
  &:hover {
    background: #f1f1f1;
    cursor: pointer;
  }
  &:hover .MuiTypography-root {
    font-weight: 600;
  }
  &:hover .MuiChip-root {
    background-color: #fff;
  }
`
