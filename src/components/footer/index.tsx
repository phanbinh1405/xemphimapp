import { Box, Button, Container, Grid, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { MenuFooter } from './styles'

function Footer() {
  const theme = useTheme()
  return (
    <Box bgcolor={theme.palette.primary.main} component='div' mt='20px'>
      <Container maxWidth='md'>
        <Grid container spacing={2} color='#fff' py={10}>
          <Grid xs={4} sx={{ textAlign: 'center' }}>
            <Image src='/logo-full.png' width={250} height={100} alt='footer-logo' />
            <Button
              variant='contained'
              sx={{
                background: '#fff',
                color: '#01B4E4',
                fontWeight: '700',
                fontSize: '18px',
                '&:hover': {
                  background: '#fff',
                },
              }}
            >
              Hi Phan Binh!
            </Button>
          </Grid>
          <Grid xs={2}>
            <Typography variant='h3' fontSize='20px' fontWeight='700' mb={1}>
              THE BASICS
            </Typography>
            <MenuFooter component='ul'>
              <li>Giới thiệu về TMDB</li>
              <li>Contact Us</li>
              <li>Support Forums</li>
              <li>API</li>
              <li>System Status</li>
            </MenuFooter>
          </Grid>
          <Grid xs={2}>
            <Typography variant='h3' fontSize='20px' fontWeight='700' mb={1}>
              GET INVOLVED
            </Typography>
            <MenuFooter component='ul'>
              <li>Contribution Bible</li>
              <li>Add New Movie</li>
              <li>Add New TV Show</li>
            </MenuFooter>
          </Grid>
          <Grid xs={2}>
            <Typography variant='h3' fontSize='20px' fontWeight='700' mb={1}>
              COMMUNITY
            </Typography>
            <MenuFooter component='ul'>
              <li>Guidelines</li>
              <li>Discussions</li>
              <li>Leaderboard</li>
              <li>Twitter</li>
            </MenuFooter>
          </Grid>
          <Grid xs={2}>
            <Typography variant='h3' fontSize='20px' fontWeight='700' mb={1}>
              LEGAL
            </Typography>
            <MenuFooter component='ul'>
              <li>Terms of Use</li>
              <li>API Terms of Use</li>
              <li>Privacy Policy</li>
            </MenuFooter>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Footer
