'use client'

import { NextUIProvider } from '@nextui-org/react'
import React from 'react'
import GifProvider from './context/gif-context'

const Wrapper = ({ children }) => {
  return (
    <div>
      <NextUIProvider>
        <GifProvider>
          <div className='screen-w'>{children}</div>
        </GifProvider>
      </NextUIProvider>
    </div>
  )
}

export default Wrapper
