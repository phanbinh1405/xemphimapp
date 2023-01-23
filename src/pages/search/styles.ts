import styled from '@emotion/styled'
import { Box } from '@mui/material'

export const ResultContainer = styled(Box)`
  position: absolute;
  // min-height: 360px;
  max-height: 360px;
  overflow-y: auto;
  max-width: 1300px;
  left: 0;
  right: 0;
  background: #fff;
  list-style-type: none;
  border-radius: 8px;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.4);
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #b9b8b8;
  }
`

export const ResultItem = styled.li`
  display: block;
  padding-block: 8px;
  padding-left: 16px;
  &:hover {
    background: #f1f1f1;
  }
`
