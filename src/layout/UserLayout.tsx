import React, { ReactNode, useState } from 'react'
import { Box, useMediaQuery, useTheme } from '@mui/material'

import Navbar from '../components/navbar'
import Footer from '../components/footer'

function UserLayout({ children }: { children: ReactNode }) {
  const [value, setValue] = useState()
  const theme = useTheme()

  const isMatch = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Box
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Navbar />
      <Box component='div'>{children}</Box>
      <Footer />
    </Box>
  )
}

export default UserLayout
