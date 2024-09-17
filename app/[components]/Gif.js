import Link from 'next/link'

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Adjust path as needed
import { FaHeart } from 'react-icons/fa'
import { addFavorite, removeFavorite } from '@/lib/features/gif/gifSlice'

const Gif = ({ gif }) => {
  const dispatch = useDispatch()
  const { favorites } = useSelector((state) => state.gifs)

  const [isHovered, setIsHovered] = useState(false)

  const isFavorited = favorites.some((favGif) => favGif.id === gif.id)

  const handleFavorite = (e) => {
    e.stopPropagation()
    e.preventDefault()

    if (isFavorited) {
      dispatch(removeFavorite(gif.id))
    } else {
      dispatch(addFavorite(gif))
    }
  }

  return (
    <div
      className='relative'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/gifs/${gif.id}`} key={gif.id}>
        <div className='w-full aspect-video mb-2 relative bg-png-pattern cursor-pointer group'>
          <img
            src={gif?.images?.fixed_width.webp}
            alt={gif?.title}
            className='w-full object-cover rounded transition-all duration-300'
          />

          {isHovered && (
            <button
              className='absolute top-2 right-2 text-white text-xl'
              onClick={(e) => handleFavorite(e)}
            >
              <FaHeart
                className={isFavorited ? 'text-yellow-500' : 'text-gray-400'}
              />
            </button>
          )}
        </div>
      </Link>
    </div>
  )
}

export default Gif
