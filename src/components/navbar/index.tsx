import SearchIcon from '@mui/icons-material/Search'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  LeftContainer,
  MenuItem,
  NavBar,
  NavBarInnerContainer,
  NavBarLogo,
  OptionsContainer,
  Profile,
  RightContainer,
} from './style'
import { useRouter } from 'next/router'
import { router } from 'next/client'
import Link from 'next/link'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
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

  return (
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
        <RightContainer>
          <SearchIcon className='icon' />
          {/* <span>KID</span> */}
          <NotificationsIcon className='icon' />
          {/* <Image
						src='https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
						alt=''
					/> */}
          <Profile>
            <ArrowDropDownIcon className='icon' />
            <OptionsContainer className='options'>
              <span style={{ padding: 10, cursor: 'pointer' }}>Settings</span>
              <span style={{ padding: 10, cursor: 'pointer' }}>Logout</span>
            </OptionsContainer>
          </Profile>
        </RightContainer>
      </NavBarInnerContainer>
    </NavBar>
  )
}

export default Navbar
