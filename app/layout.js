import StoreProvider from '@/lib/StoreProvider'
import './globals.css'
import { Inter } from 'next/font/google'
import Nav from './[components]/Nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Gif-search-app',
  description: 'An application that lets you meme it out as much as you  want!',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <StoreProvider>
          <div className='max-w-5xl mx-auto'>
            <Nav />
            {children}
          </div>
        </StoreProvider>
      </body>
    </html>
  )
}
