import { Search } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import { Autocomplete, Box, Button, Container, IconButton, Stack, TextField } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import useSWR from 'swr'
import { AuthContext } from '../../context/AuthContext'
import UserDropdown from '../userDropdown'
import { LeftContainer, MenuItem, NavBar, NavBarInnerContainer, NavBarLogo } from './style'

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
            <MenuItem href='/'>Homepage</MenuItem>
            <MenuItem href='/catalog/tv'>TV Series</MenuItem>
            <MenuItem href='/catalog/movie'>Movies</MenuItem>
          </LeftContainer>
          <Stack component='div' direction='row' spacing={2}>
            <IconButton onClick={() => setShowSearchBar(!isShowSearchBar)}>
              <SearchIcon sx={{ color: '#fff' }} className='icon' />
            </IconButton>

            <UserDropdown />
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
    </>
  )
}

export default Navbar
