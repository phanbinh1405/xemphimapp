import { createTheme } from '@mui/material'

const theme = createTheme({
  typography: {
    fontFamily: ['Source Sans Pro', 'serif'].join(','),
    h2: {
      fontWeight: 700,
      fontSize: '1.2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.2rem',
    },
  },
  palette: {
    primary: {
      main: '#032541',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1348,
      xl: 1536,
    },
  },
})

export { theme }
