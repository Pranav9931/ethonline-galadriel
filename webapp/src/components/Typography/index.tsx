import { Typography } from '@mui/material'
import React from 'react'

type MainText = {
    content: string,
    textSize: number
}
const MainText = ({content, textSize}: MainText) => {
  return (
    <Typography sx={{
        color: '#ffffff',
        fontSize: `${textSize}px`,
        fontFamily: 'var(--main-font)',
        letterSpacing: '1px'
    }}>
        {content}
    </Typography>
  )
}

export default MainText