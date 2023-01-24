import { Box, Modal } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { DetailMovie } from '../../constants/types/detailMovieType'

interface ModalWatchMovieProps {
  open: boolean
  handleClose: (value: boolean) => void
  type?: string | string[] | undefined
  item: DetailMovie | undefined
}

const ModalWatchMovie = ({ open, handleClose, type, item }: ModalWatchMovieProps): JSX.Element => {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (iframeRef.current !== null) {
      const height = (iframeRef?.current?.offsetWidth * 9) / 16 + 'px'
      iframeRef?.current?.setAttribute('height', height)
    }
  }, [])

  console.log(iframeRef?.current)
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box
        ref={iframeRef}
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: 1300,
          width: '90%',
          bgcolor: 'background.paper',
        }}
      >
        {/* <iframe src={`https://2embed.org/embed/movie?tmdb=${item?.id}`} width='100%' height='100%' allowFullScreen /> */}
      </Box>
    </Modal>
  )
}

export default ModalWatchMovie
