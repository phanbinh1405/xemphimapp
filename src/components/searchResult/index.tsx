import { Box, Chip, Stack, Typography } from '@mui/material'
import { memo, useState } from 'react'
import { ResultItem } from './styles'
const RESULT_VALUE = [
  { title: 'Movies', key: 'movie' },
  { title: 'People', key: 'people' },
  { title: 'TV Shows', key: 'tv' },
]

interface ResType {
  page: number
  results: any[]
  totalPages: number
  totalResults: number
}

interface SearchResultProps {
  movie: ResType
  people: ResType
  tv: ResType
  setShowResults: (value: string) => void
}

function SearchResult(props: SearchResultProps) {
  const handleShowResults = props.setShowResults
  const [activeItem, setActive] = useState<string>('movie')
  return (
    <Box sx={{ borderRadius: '8px', overflow: 'hidden' }} component='div'>
      <Box component='div' sx={{ padding: '20px', background: 'rgb(1,180,228)' }}>
        <Typography variant='h3' color='#fff'>
          Search Result
        </Typography>
      </Box>
      <Box
        component='div'
        sx={{
          border: '1px solid rgb(227,227,227)',
          paddingBlock: '8px',
          borderBottomLeftRadius: '8px',
          borderBottomRightRadius: '8px',
        }}
      >
        {RESULT_VALUE.map((item) => {
          const isActive = activeItem === item.key
          return (
            <ResultItem
              key={item.key}
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              onClick={() => {
                setActive(item.key)
                handleShowResults(item.key)
              }}
              bgcolor={isActive ? '#f1f1f1' : ''}
            >
              <Typography fontWeight={isActive ? '600' : '400'}>{item.title}</Typography>
              <Chip
                label={props?.[item.key as keyof typeof SearchResult]?.['totalResults']}
                sx={{
                  '&.MuiChip-root': { height: '22px', borderRadius: '4px', backgroundColor: isActive ? '#fff' : null },
                }}
              />
            </ResultItem>
          )
        })}
      </Box>
    </Box>
  )
}

export default memo(SearchResult)
