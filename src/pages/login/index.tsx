import { Button, Stack, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'

function LoginPage() {
  const router = useRouter()
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : ''

  const { data } = useSWR(`authentication/token/new`)
  return (
    <Box component='div' mt='64px'>
      <Container maxWidth='lg'>
        <Box component='div' textAlign='center' height='60vh'>
          <Typography variant='h2' fontSize='1.6rem' sx={{ paddingTop: '30px', marginBottom: '20px' }}>
            Log In
          </Typography>
          <Typography>
            You need to use your themoviedb account to log in to this website. If you don&apos;t have themoviedb account
            create one to continue
          </Typography>
          <Stack spacing={3} direction='row' justifyContent='center' mt={2}>
            <Link
              href={`https://www.themoviedb.org/authenticate/${data?.requestToken}?redirect_to=${origin}`}
              passHref={true}
              style={{ textDecoration: 'none' }}
            >
              <Button
                sx={{
                  background: '#01B4E4',
                  color: '#fff',
                  fontWeight: '600',
                  '&.MuiButton-root:hover': {
                    background: 'rgb(3,37,65)',
                  },
                }}
              >
                Continue to TMDB
              </Button>
            </Link>
            <Button
              onClick={() => router.push('/')}
              sx={{
                background: '##ced3db',
                color: '#333',
                fontWeight: '600',
                '&.MuiButton-root:hover': {
                  background: '#E4E7EB',
                },
              }}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

export default LoginPage
