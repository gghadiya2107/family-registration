import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Loader = () => {
  return (
    <>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"85vh"}><CircularProgress /></Box>
    </>
  )
}

export default Loader
