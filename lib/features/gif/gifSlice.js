import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Initial state
const initialState = {
  gifs: [],
  page: 0,
  status: 'idle',
  searchQuery: '',
  favorites: [], // Track favorite GIFs
}

// Fetch GIFs by page
export const fetchGIFs = createAsyncThunk(
  'gifs/fetchGIFs',
  async ({ searchQuery, page }) => {
    const limit = 10 // Updated limit
    const response = await axios.get(
      `https://api.giphy.com/v1/gifs/${searchQuery ? 'search' : 'trending'}`,
      {
        params: {
          api_key: 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65',
          q: searchQuery || '',
          // limit,
          offset: page * limit,
        },
      }
    )
    return response.data.data
  }
)

const gifSlice = createSlice({
  name: 'gifs',
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload
      state.gifs = [] // Reset gifs on new search
      state.page = 0 // Reset page for new search
    },
    resetGifs(state) {
      state.gifs = []
      state.page = 0
    },
    addFavorite(state, action) {
      state.favorites = [...state.favorites, action.payload]
      localStorage.setItem('favoriteGIFs', JSON.stringify(state.favorites))
    },
    removeFavorite(state, action) {
      state.favorites = state.favorites.filter((id) => id !== action.payload)
      localStorage.setItem('favoriteGIFs', JSON.stringify(state.favorites))
    },
    loadFavoritesFromLocalStorage(state) {
      const favorites = JSON.parse(localStorage.getItem('favoriteGIFs')) || []
      state.favorites = favorites
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGIFs.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchGIFs.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.gifs = [...state.gifs, ...action.payload]
        state.page += 1
      })
      .addCase(fetchGIFs.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const {
  setSearchQuery,
  resetGifs,
  addFavorite,
  removeFavorite,
  loadFavoritesFromLocalStorage,
} = gifSlice.actions
export default gifSlice.reducer
