'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchFavoriteGIFs,
  loadFavoritesFromLocalStorage,
} from '@/lib/features/gif/gifSlice' // Adjust path as necessary
import Gif from '@/app/[components]/Gif' // Adjust path as necessary
import Spinner from '@nextui-org/react' // Create a spinner component

const Favorites = () => {
  const favs = JSON.parse(localStorage.getItem('favoriteGIFs')) || []

  const dispatch = useDispatch()
  const { gifs, status, favorites } = useSelector((state) => state.gifs)

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Favorite GIFs</h1>

      {status === 'loading' && <Spinner />}

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
        {favs.map((gif) => (
          <Gif key={gif.id} gif={gif} />
        ))}
      </div>
    </div>
  )
}

export default Favorites
