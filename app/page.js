'use client'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Input, Spinner } from '@nextui-org/react'
import InfiniteScroll from 'react-infinite-scroll-component'
// Adjust import based on your component structure
import Gif from './[components]/Gif'
import { fetchGifs, resetGifs } from '@/lib/features/gif/gifSlice'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const dispatch = useDispatch()
  const { gifs, pagination, loading, error } = useSelector(
    (state) => state.gifs
  )

  useEffect(() => {
    // Fetch trending GIFs by default
    if (!searchQuery.trim()) {
      dispatch(
        fetchGifs({
          searchQuery: 'trending',
          limit: pagination.limit,
          offset: pagination.offset,
        })
      )
    }
  }, [dispatch, searchQuery, pagination.limit, pagination.offset])

  useEffect(() => {
    if (searchQuery.trim()) {
      dispatch(resetGifs()) // Reset GIFs when search query changes
      dispatch(
        fetchGifs({
          searchQuery,
          limit: pagination.limit,
          offset: pagination.offset,
        })
      )
    }
  }, [dispatch, searchQuery])

  const fetchMoreGifs = () => {
    if (!loading && pagination.offset < pagination.totalCount) {
      dispatch(
        fetchGifs({
          searchQuery,
          limit: pagination.limit,
          offset: pagination.offset,
        })
      )
    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className='p-4'>
      <div className='my-3'>
        <Input
          clearable
          underlined
          placeholder='Search GIFs...'
          value={searchQuery}
          onChange={handleSearchChange}
          radius='sm'
        />
      </div>

      {error && <p className='text-red-500'>Error: {error}</p>}

      <InfiniteScroll
        dataLength={gifs.length}
        next={fetchMoreGifs}
        hasMore={gifs.length < pagination.totalCount}
        loader={<Spinner />}
        endMessage={<p className='text-center'>No more GIFs to load.</p>}
      >
        {/* <div className='columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2'>  */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
          {gifs.map((gif) => (
            <Gif key={gif.id} gif={gif} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default Home
