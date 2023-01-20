import { Box } from '@mui/material'
import { useKeenSlider } from 'keen-slider/react'
import React from 'react'
import { TrendingItem } from '../../constants/types/trendingType'
import Item from '../sectionItem'
import 'keen-slider/keen-slider.min.css'

interface SectionListProps {
  title: string
  data: TrendingItem[]
}

function SectionList({ title = `What's Popular`, data = [] }: SectionListProps) {
  const [ref] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      '(min-width: 400px)': {
        slides: { perView: 2, spacing: 5 },
      },
      '(min-width: 1000px)': {
        slides: { perView: 7.5, spacing: 20 },
      },
    },
    slides: { perView: 1 },
  })
  return (
    <Box style={{ paddingTop: 30 }}>
      <Box
        sx={{
          background: `url(/trending-bg.svg)`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom',
        }}
      >
        <h2 style={{ marginBottom: 20, fontWeight: '600' }}>{title}</h2>
        {data && data.length > 0 ? (
          <Box ref={ref} className='keen-slider' pb={2.5}>
            {data.map((item) => {
              return <Item key={item.id} info={item} />
            })}
          </Box>
        ) : null}
      </Box>
    </Box>
  )
}

export default SectionList
