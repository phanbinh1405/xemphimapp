import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import Chart from '../pieChartItem'
import { ChartContainer } from './styles'
import { TrendingItem } from '../../constants/types/trendingType'
import moment from 'moment'
import Link from 'next/link'

interface ItemProp {
  info: TrendingItem
  path?: string
}

function Item({ info, path }: ItemProp) {
  const title = info.name || info.title || ''
  return (
    <Card
      sx={{
        maxWidth: 345,
        border: 'none',
        boxShadow: 'none',
        '&.MuiCard-root': { backgroundColor: 'transparent' },
      }}
      className='keen-slider__slide'
    >
      <Link href={`/detail/${path || info.mediaType}/${info.id}`} style={{ textDecoration: 'none', color: '#333' }}>
        <CardActionArea>
          <div style={{ position: 'relative' }}>
            <CardMedia
              style={{ borderRadius: '8px' }}
              component='img'
              height='225'
              image={`https://www.themoviedb.org/t/p/w220_and_h330_face${info.posterPath}`}
              alt='green iguana'
            />
            <ChartContainer>
              <Chart voteAverage={info.voteAverage} />
            </ChartContainer>
          </div>
          <CardContent sx={{ paddingTop: '26px', paddingInline: '10px', paddingBottom: 0 }}>
            <Typography gutterBottom variant='body1' component='div' sx={{ fontWeight: '700', margin: 0 }}>
              {title?.length > 30 ? `${title.slice(0, 27)} ...` : title}
            </Typography>
            <Typography gutterBottom variant='body1' component='div' sx={{ color: 'rgba(0,0,0,0.6)' }}>
              {`${moment(info.releaseDate || info.firstAirDate).format('MMM DD, YYYY')}`}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  )
}

export default React.memo(Item)
