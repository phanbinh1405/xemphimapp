import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import useSWR from 'swr'

export interface CastType {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

function CastsList({ type, id }: { type?: string; id?: string }) {
  const { data } = useSWR(`${type}/${id}/credits`)
  return (
    <>
      <Grid container spacing={2}>
        {data?.cast.slice(0, 4).map((cast: CastType) => (
          <Grid key={cast.id} xs={6} md={3}>
            <Card sx={{ maxWidth: 138, backgroundColor: 'transparent', boxShadow: 0, color: '#fff' }}>
              <CardMedia
                component='img'
                height='175'
                image={
                  !!cast?.profile_path
                    ? `https://www.themoviedb.org/t/p/w138_and_h175_face${cast?.profile_path}`
                    : '/film_poster.jpg'
                }
                alt='green iguana'
              />
              <CardContent
                sx={{
                  paddingTop: '8px',
                  paddingInline: 0,
                  '&.MuiCardContent-root:last-child': { paddingBottom: '10px' },
                }}
              >
                <Typography variant='h3' marginBottom={0} fontSize='16px'>
                  {cast?.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default CastsList
