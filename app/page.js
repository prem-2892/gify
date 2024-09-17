'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchGIFs,
  setSearchQuery,
  loadFavoritesFromLocalStorage,
} from '@/lib/features/gif/gifSlice' // Adjust path as necessary
import Gif from './[components]/Gif' // Adjust import path
// Create a spinner component
import { Input, Pagination, Spinner } from '@nextui-org/react'

const Home = () => {
  const dispatch = useDispatch()
  const { gifs, status, page, searchQuery, favorites } = useSelector(
    (state) => state.gifs
  )
  const [currentPage, setCurrentPage] = useState(1)

  // Fetch GIFs and favorites from local storage
  useEffect(() => {
    dispatch(fetchGIFs({ searchQuery, page: currentPage - 1 }))
    dispatch(loadFavoritesFromLocalStorage())
  }, [dispatch, searchQuery, currentPage])

  // Handle search input change
  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value))
    setCurrentPage(1) // Reset to page 1 on new search
  }

  // Handle page change for pagination
  const handlePageChange = (page) => {
    setCurrentPage(page)
    dispatch(fetchGIFs({ searchQuery, page: page - 1 }))
  }

  return (
    <div>
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

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
        {gifs.map((gif) => (
          <Gif key={gif.id} gif={gif} />
        ))}
      </div>

      {status === 'loading' && <Spinner />}

      <Pagination
        total={Math.ceil(gifs.length / 50)}
        initialPage={currentPage}
        onChange={handlePageChange}
        className='mt-4'
      />
    </div>
  )
}

export default Home
