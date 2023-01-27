import { Menu, Search } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import {
  Autocomplete,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { Router, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import UserDropdown from '../userDropdown'
import {
  HambugerButtonContainer,
  LeftContainer,
  MenuContainer,
  MenuItem,
  NavBar,
  NavBarInnerContainer,
  NavBarLogo,
} from './style'

interface OptionType {
  name: string
  title: number
}

const Navbar = () => {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [filter, setFilter] = useState('')
  const [searchData, setSearchData] = useState('')
  const [isShowSearchBar, setShowSearchBar] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY !== 0)
    })
    return () => {
      window.removeEventListener('scroll', () => {
        setIsScrolled(window.scrollY !== 0)
        setIsScrolled(router.asPath !== '/')
      })
    }
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchData(filter)
    }, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [filter])
  const { data } = useSWR(searchData !== '' ? `search/keyword?query=${searchData}` : null)

  return (
    <>
      <NavBar isScrolled={router.asPath !== '/' || isScrolled}>
        <NavBarInnerContainer>
          <LeftContainer>
            <Link href={'/'} style={{ display: 'inline-flex' }}>
              <NavBarLogo src='/logo-full.png' alt='' width={100} height={25} />
            </Link>
            <MenuContainer>
              <MenuItem href={`/`}>
                <Typography color={`${router.asPath === '/' && '#ff0000'}`}>Homepage</Typography>
              </MenuItem>
              <MenuItem href={`/catalog/tv`}>
                <Typography color={`${router.asPath === '/catalog/tv' && '#ff0000'}`}>TV Series</Typography>
              </MenuItem>
              <MenuItem href={`/catalog/movie`}>
                <Typography color={`${router.asPath === '/catalog/movie' && '#ff0000'}`}>Movies</Typography>
              </MenuItem>
            </MenuContainer>
          </LeftContainer>
          <Stack component='div' direction='row' spacing={2} alignItems='center'>
            <IconButton onClick={() => setShowSearchBar(!isShowSearchBar)}>
              <SearchIcon sx={{ color: '#fff' }} className='icon' />
            </IconButton>

            <UserDropdown />

            <HambugerButtonContainer>
              <IconButton sx={{ color: '#fff' }} onClick={() => setOpenDrawer(true)}>
                <Menu color='inherit' />
              </IconButton>
            </HambugerButtonContainer>
          </Stack>
        </NavBarInnerContainer>

        {isShowSearchBar && (
          <Box borderBottom={1} borderColor={'rgb(227,227,227)'} bgcolor='#fff'>
            <Container>
              <Autocomplete
                freeSolo
                options={data?.results || []}
                getOptionLabel={(option: OptionType | string) => {
                  if (typeof option === 'string') {
                    return option
                  }

                  return option.name
                }}
                renderOption={(props, option: OptionType) => (
                  <li {...props} onClick={() => router.push(`/search/${option.name}`)}>
                    {option.name}
                  </li>
                )}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    paddingX: 0,
                    paddingY: '10px',
                  },
                  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder='Search for a movie, tv show,...'
                    onChange={(e) => setFilter(e.target.value)}
                    onKeyDown={(e) => e.code === 'Enter' && router.push(`/search/${filter}`)}
                    InputProps={{
                      sx: {
                        color: 'rgba(0,0,0,0.5)',
                        '& ::placeholder': {
                          color: 'rgba(0,0,0,0.5)',
                        },
                        border: 0,
                      },
                      ...params.InputProps,
                      spellCheck: false,
                      startAdornment: <Search />,
                    }}
                  />
                )}
              />
            </Container>
          </Box>
        )}
      </NavBar>

      <Drawer anchor='right' open={openDrawer} onClose={() => setOpenDrawer(!openDrawer)}>
        <List>
          <ListItem disablePadding>
            <ListItemButton sx={{ paddingInline: 4 }}>
              <MenuItem href={`/`}>
                <Typography color={`${router.asPath === '/' && '#ff0000'}`}>Homepage</Typography>
              </MenuItem>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ paddingInline: 4 }}>
              <MenuItem href={`/catalog/tv`}>
                <Typography color={`${router.asPath === '/catalog/tv' && '#ff0000'}`}>TV Series</Typography>
              </MenuItem>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ paddingInline: 4 }}>
              <MenuItem href={`/catalog/movie`}>
                <Typography color={`${router.asPath === '/catalog/movie' && '#ff0000'}`}>Movies</Typography>
              </MenuItem>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}

export default Navbar
