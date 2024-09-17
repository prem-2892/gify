'use client'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '@/api/axiosInstace'

// Thunk to fetch GIFs with pagination
export const fetchGifs = createAsyncThunk(
  'gifs/fetchGifs',
  async ({ searchQuery, limit, offset }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/search', {
        params: {
          q:
            searchQuery == '' || searchQuery == null ? 'trending' : searchQuery,
          limit: 20,
          offset,
        },
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const gifSlice = createSlice({
  name: 'gifs',
  initialState: {
    gifs: [],
    favorites: JSON.parse(localStorage.getItem('favoriteGIFs')) || [],
    pagination: {
      offset: 0,
      limit: 20,
      totalCount: 0,
    },
    page: 0,
    loadingMore: false,
    loading: false,
    error: null,
  },
  reducers: {
    resetGifs: (state) => {
      state.gifs = []
      state.pagination = { offset: 0, limit: 20, totalCount: 0 }
    },
    loadFavoritesFromLocalStorage(state) {
      const favorites = JSON.parse(localStorage.getItem('favoriteGIFs')) || []
      state.favorites = favorites
    },
    addFavorite(state, action) {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload)
        localStorage.setItem('favoriteGIFs', JSON.stringify(state.favorites))
      }
    },
    removeFavorite(state, action) {
      state.favorites = state.favorites.filter(
        (gif) => gif.id !== action.payload
      )
      localStorage.setItem('favoriteGIFs', JSON.stringify(state.favorites))
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGifs.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchGifs.fulfilled, (state, action) => {
        const { data, pagination } = action.payload
        state.gifs = [...state.gifs, ...data] // Append new GIFs to existing ones
        state.pagination = {
          ...state.pagination,
          offset: state.pagination.offset + pagination.count, // Update offset for next fetch
          totalCount: pagination.total_count,
        }
        state.loading = false
      })
      .addCase(fetchGifs.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const {
  setGifs,
  loadFavoritesFromLocalStorage,
  addFavorite,
  removeFavorite,
} = gifSlice.actions
export default gifSlice.reducer
