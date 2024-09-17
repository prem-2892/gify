'use client'

import { Provider } from 'react-redux'
import Store from './Store'

const StoreProvider = ({ children }) => {
  return <Provider store={Store}>{children}</Provider>
}

export default StoreProvider
