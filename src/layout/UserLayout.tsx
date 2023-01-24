import React, { ReactNode } from 'react'
import { Box } from '@mui/material'

import Navbar from '../components/navbar'
import Footer from '../components/footer'

function UserLayout({ children }: { children: ReactNode }) {
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
