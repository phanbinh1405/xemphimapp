import { Logout } from '@mui/icons-material'
import { Avatar, Box, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

function UserDropdown() {
  const { isAuthenticated, profile, reset } = useContext(AuthContext)
  const router = useRouter()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return !isAuthenticated ? (
    <Button
      onClick={() => router.push('/login')}
      sx={{
        background: '#ff0000',
        color: '#fff',
        '&.MuiButton-root:hover': {
          background: '#c50000',
        },
      }}
    >
      Đăng nhập
    </Button>
  ) : (
    <Box component='div'>
      <IconButton onClick={handleOpen} size='small' aria-haspopup='true'>
        <Avatar
          src={`https://image.tmdb.org/t/p/w500${profile?.avatar.tmdb.avatar_path}`}
          sx={{ width: 40, height: 40 }}
        />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        disableScrollLock
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 30,
              height: 30,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => router.push('/profile')}>
          <Avatar src={`https://image.tmdb.org/t/p/w500${profile?.avatar.tmdb.avatar_path}`} />
          <Stack>
            <Typography variant='body1' fontWeight='700'>
              {(profile?.name || '').length > 20 ? `${profile?.name.slice(0, 10)}...` : profile?.name}
            </Typography>
            <Typography variant='body1' fontSize='0.8rem'>
              Profile
            </Typography>
          </Stack>
        </MenuItem>

        <Divider />

        <MenuItem onClick={() => reset()}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default UserDropdown
