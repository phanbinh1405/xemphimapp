import { Bookmark, Favorite, Star } from '@mui/icons-material'
import { IconButton, Stack, Tooltip } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { AuthContext } from '../../context/AuthContext'
import axiosInstance from '../../utils/fetchWithTimeOut'

function ActionList({ type, id }: { type: string | undefined; id: string | undefined }) {
  const { profile } = useContext(AuthContext)

  const [isFavorite, setFavorite] = useState(false)
  const [isInWatchList, setWatchList] = useState(false)

  const markFavorite = async (url: string, { arg }: any) => {
    const res = await axiosInstance({
      url,
      method: 'post',
      data: arg,
    })

    return res.data
  }

  const { trigger: triggerFavorite } = useSWRMutation(`account/${profile?.id}/favorite`, markFavorite)
  const { trigger: triggerWatchList } = useSWRMutation(`account/${profile?.id}/watchlist`, markFavorite)

  return (
    <Stack direction='row' spacing={3}>
      <Tooltip title='Mark as favorite' arrow>
        <IconButton
          style={{ width: 46, height: 46, background: '#032541' }}
          onClick={() => {
            triggerFavorite({
              media_type: type,
              media_id: id,
              favorite: isFavorite ? false : true,
            })

            setFavorite(!isFavorite)
          }}
        >
          <Favorite style={{ color: isFavorite ? '#ef47b6' : '#fff' }} fontSize='small' />
        </IconButton>
      </Tooltip>
      <Tooltip title='Add to your watchlist' arrow>
        <IconButton
          style={{ width: 46, height: 46, background: '#032541' }}
          onClick={() => {
            triggerWatchList({
              media_type: type,
              media_id: id,
              favorite: isFavorite ? false : true,
            })
            setWatchList(!isInWatchList)
          }}
        >
          <Bookmark style={{ color: isInWatchList ? '#cf3131' : '#fff' }} fontSize='small' />
        </IconButton>
      </Tooltip>
      <Tooltip title='Rate It!' arrow>
        <IconButton style={{ width: 46, height: 46, background: '#032541' }}>
          <Star style={{ color: '#fff' }} fontSize='small' />
        </IconButton>
      </Tooltip>
    </Stack>
  )
}

export default ActionList
