import React from 'react'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'

interface SearchButtonProps {
  search: string
}

function SearchButton({ search }: SearchButtonProps) {
  const router = useRouter()
  return (
    <Button
      onClick={() =>
        search
          ? router.push({
              pathname: `/search/${search}`,
            })
          : router.push('/search')
      }
      sx={{
        background: 'linear-gradient(to right, rgba(30,213,169, 1) 0%, rgba(1,180,228, 1) 100%)',
        borderRadius: 50,
        minHeight: '40px',
        paddingX: '26px',
        paddingY: '10px',
        fontWeight: '700',
        textTransform: 'capitalize',
        color: 'white',
        '&:hover': {
          color: 'black',
        },
      }}
    >
      Search
    </Button>
  )
}

export default SearchButton
