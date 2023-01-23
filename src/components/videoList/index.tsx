import { Box, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'

interface VideoListProps {
  type?: string
  id?: string
}

interface VideoType {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}

function VideoList({ type, id }: VideoListProps) {
  const { data, isLoading } = useSWR(`${type}/${id}/videos`)
  const [videos, setVideo] = useState<VideoType[]>([])
  useEffect(() => {
    setVideo(data?.results.reverse().slice(0, 3))
  }, [data])
  if (videos?.length === 0 && !isLoading) {
    return <Typography>There are no video here</Typography>
  }
  return (
    <>
      {videos?.map((video: VideoType) => {
        return <Video video={video} key={video.id} />
      })}
    </>
  )
}

const Video = ({ video }: { video: VideoType }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (iframeRef.current !== null) {
      const height = (iframeRef?.current?.offsetWidth * 9) / 16 + 'px'
      iframeRef?.current?.setAttribute('height', height)
    }
  }, [])
  return (
    <Box mb={3}>
      <Typography variant='body1' fontSize='18px' fontWeight='700'>
        {video?.name}
      </Typography>
      <iframe
        key={video?.id}
        src={`https://www.youtube.com/embed/${video?.key}`}
        ref={iframeRef}
        width='100%'
        title='video'
        allowFullScreen
      />
    </Box>
  )
}

export default VideoList
