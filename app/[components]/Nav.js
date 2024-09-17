'use client'

import { Button } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

const Nav = () => {
  const { user, loading, error } = useSelector((state) => state.auth)

  return (
    <div className='flex flex-row items-center justify-between'>
      <Link href='/'>
        <h2>Logo</h2>
      </Link>
      <div className=''>
        {user === null ? (
          <Link href={'/login'}>
            <Button radius='sm'>Login</Button>
          </Link>
        ) : (
          <Button radius='sm'>Logout</Button>
        )}
      </div>
    </div>
  )
}

export default Nav
