'use client'

import Gif from '@/app/[components]/Gif'
import { Spinner } from '@nextui-org/react'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { HiOutlineExternalLink } from 'react-icons/hi'
import {
  HiMiniChevronDown,
  HiMiniChevronUp,
  HiMiniHeart,
} from 'react-icons/hi2'
import { FaPaperPlane } from 'react-icons/fa6'
import { IoCodeSharp } from 'react-icons/io5'
import { addFavorite, removeFavorite } from '@/lib/features/gif/gifSlice'
import { useDispatch } from 'react-redux'

const GifPage = () => {
  const [isFavorited, setIsFavorited] = useState(null)
  const params = useParams()
  const dispatch = useDispatch()
  const { id } = params
  const favorites = JSON.parse(localStorage.getItem('favoriteGIFs')) || []

  useEffect(() => {
    setIsFavorited(favorites.some((favGif) => favGif.id === id))
  }, [id])

  const [gif, setGif] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleFavorite = (e) => {
    e.stopPropagation()
    e.preventDefault()

    if (isFavorited) {
      dispatch(removeFavorite(id))
    } else {
      dispatch(addFavorite(gif))
    }
    window.location.reload()
  }

  useEffect(() => {
    const fetchGifById = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(
          `https://api.giphy.com/v1/gifs/${id}`,
          {
            params: { api_key: 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65' },
          }
        )

        setGif(data.data) // Save the GIF data
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch GIF')
        setLoading(false)
      }
    }

    if (id) fetchGifById()
  }, [id])

  if (loading) return <Spinner /> // Show a loading spinner while fetching

  if (error) return <div className='text-red-500'>{error}</div>

  return (
    <div className='grid grid-cols-4 my-10 gap-4'>
      <div className='hidden sm:block'>
        {gif?.user && (
          <>
            <div className='flex gap-1'>
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className='h-14'
              />
              <div className='px-2'>
                <div className='font-bold'>{gif?.user?.display_name}</div>
                <div className='faded-text'>@{gif?.user?.username}</div>
              </div>
            </div>
            {/* {gif?.user?.description && (
              <p className='py-4 whitespace-pre-line text-sm text-gray-400'>
                {readMore
                  ? gif?.user?.description
                  : gif?.user?.description.slice(0, 100) + '...'}
                <div
                  className='flex items-center faded-text cursor-pointer'
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? (
                    <>
                      Read less <HiMiniChevronUp size={20} />
                    </>
                  ) : (
                    <>
                      Read more <HiMiniChevronDown size={20} />
                    </>
                  )}
                </div>
              </p>
            )} */}
          </>
        )}

        <div className='divider' />

        {gif?.source && (
          <div>
            <span
              className='faded-text' //custom - faded-text
            >
              Source
            </span>
            <div className='flex items-center text-sm font-bold gap-1'>
              <HiOutlineExternalLink size={25} />
              <a href={gif.source} target='_blank' className='truncate'>
                {gif.source}
              </a>
            </div>
          </div>
        )}
      </div>

      <div className='col-span-4 sm:col-span-3'>
        <div className='flex gap-6'>
          <div className='w-full sm:w-3/4'>
            <div className='faded-text truncate mb-2'>{gif.title}</div>
            <Gif gif={gif} hover={false} />

            {/* -- Mobile UI -- */}
            <div className='flex sm:hidden gap-1'>
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className='h-14'
              />
              <div className='px-2'>
                <div className='font-bold'>{gif?.user?.display_name}</div>
                <div className='faded-text'>@{gif?.user?.username}</div>
              </div>

              <button className='ml-auto'>
                <FaPaperPlane size={25} />
              </button>
            </div>
            {/* -- Mobile UI -- */}
          </div>

          <div className='hidden sm:flex flex-col gap-5 mt-6'>
            {isFavorited ? (
              <button
                onClick={handleFavorite}
                className='flex gap-5 items-center font-bold text-lg'
              >
                <HiMiniHeart size={30} className={`text-yellow-500`} />
                Favorited
              </button>
            ) : (
              <button
                onClick={handleFavorite}
                className='flex gap-5 items-center font-bold text-lg'
              >
                <HiMiniHeart
                  size={30}
                  className={`${favorites.includes(id) ? 'text-red-500' : ''}`}
                />
                Favorite
              </button>
            )}
            <button
              // onClick={shareGif} // Assignment
              className='flex gap-6 items-center font-bold text-lg'
            >
              <FaPaperPlane size={25} />
              Share
            </button>
            <button
              // onClick={EmbedGif} // Assignment
              className='flex gap-5 items-center font-bold text-lg'
            >
              <IoCodeSharp size={30} />
              Embed
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GifPage
