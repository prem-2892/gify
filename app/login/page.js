'use client'

import { loginUser } from '@/lib/features/auth/authSlice'
import { Button, Input } from '@nextui-org/react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {
  const dispatch = useDispatch()

  const [state, setState] = useState({
    email: '',
    password: '',
  })

  const updateField = (fieldName, value) => {
    setState({
      ...state,
      [fieldName]: value,
    })
  }

  const { user, loading, error } = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(loginUser(state))
  }

  //redirection on successful action
  useEffect(() => {
    if (user != null) {
      redirect('/')
    }
  }, [user])

  return (
    <div className='max-w-lg mx-auto mt-48'>
      <h3 className='text-center'>Login</h3>
      {error && (
        <>
          <p className='rounded-md bg-red-400 text-red-950 px-3 py-2 my-3'>
            {error}
          </p>
        </>
      )}
      <form
        action=''
        className='my-4 max-w-lg'
        onSubmit={(e) => handleSubmit(e)}
      >
        <Input
          type='email'
          label='Email'
          variant='bordered'
          value={state.email}
          radius='sm'
          onValueChange={(e) => updateField('email', e)}
          classNames={{
            input: ' w-full',
            inputWrapper: 'mx-auto my-3',
          }}
        />
        <Input
          type='password'
          label='Password'
          variant='bordered'
          value={state.password}
          radius='sm'
          onValueChange={(e) => updateField('password', e)}
          className='my-3 max-w-lg mx-auto'
        />
        <Button
          type='submit'
          color='primary'
          radius='sm'
          className='mx-auto text-xl py-3 w-full '
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </Button>
      </form>
      <p>
        Don&apos;t have an account{' '}
        <span className='text-blue-700 underline'>
          <Link href='register'>Sign Up</Link>
        </span>
      </p>
    </div>
  )
}

export default Login
