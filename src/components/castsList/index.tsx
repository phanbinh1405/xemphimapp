import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material'
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
  console.log(data)
  return (
    <>
      <Stack direction='row' spacing={3}>
        {data?.cast.slice(0, 4).map((cast: CastType) => (
          <Card key={cast.id} sx={{ maxWidth: 138, backgroundColor: 'transparent', boxShadow: 0, color: '#fff' }}>
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
        ))}
      </Stack>
    </>
  )
}

export default CastsList
