import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAuth from '@/stores/useAuth'
import useItems from '@/stores/useItems'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }) {
  const [search, setSearch] = useState(false);
  const auth = useAuth();
  const items = useItems();

  useEffect(() => {
    if (!auth.token) {
      const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        body: JSON.stringify({
          client_id: 'dXdA5eN0W9QG3FWk1flq4TLPy2Td9qV2',
          client_secret: '9DC2Wvwspf-wAff4JogCRYDJDNPOPy-W6THbaUkY7UXfiswBVp8w0UcDRBcVgwF',
          grant_type: 'client_credentials',
          audience: 'https://giftcards-sandbox.reloadly.com'
        })
      };

      const resp = fetch('https://auth.reloadly.com/oauth/token', options)
      .then(res => res.json())
      .then(dat => auth.setToken(dat.access_token) )
    }
  }, [auth])

  return (
    <main className={inter.className}>
      <Head>
        <title>Giftcard Company</title>
      </Head>
      <div className='w-full min-h-svh px-16 bg-black'>
        <div className='flex flex-col w-full min-h-svh bg-white'>
          {/* navbar */}
          <div className='flex justify-between items-center py-4 px-2 bg-slate-800 text-white shadow-md'>
            <div className='flex space-x-4 items-center'>
              <Link href={'/'}>
                <div className='cursor-pointer text-2xl'>Giftcard Company</div>
              </Link>
              <div className='flex space-x-4'>
                <Link href={'/cards'}>Cards</Link>
              </div>
            </div>
            <div className='flex space-x-4 items-center'>
              <div className='flex space-x-2 items-center'>
                {search && <div>
                  <input type='text' className='w-[200px] border-2 rounded-md' placeholder='Search something?' />
                </div>}
                <div className='cursor-pointer' onClick={() => setSearch(!search)}>
                🔍
                </div>
              </div>
              <div className='cursor-pointer text-lg'>🛒 <span className='text-sm'>(1)</span></div>
              <div className='cursor-pointer text-lg'>👤</div>
            </div>
          </div>
          {/* body */}
          <div className='flex flex-col flex-1'>
            {children}
          </div>
          {/* footer */}
          <div className='px-2 py-6 grid grid-cols-4 gap-4 bg-slate-800 text-white'>
            <div className='col-span-2'>
              Giftcard ©️ 2024
            </div>
            <div className='flex flex-col space-y-2'>
              <Link href={'/'}>Terms and Conditions</Link>
              <Link href={'/'}>Disclaimer</Link>
              <Link href={'/'}>How to Buy</Link>
              <Link href={'/'}>Promos</Link>
            </div>
            <div className='flex flex-col space-y-2'>
              <div className='text-lg font-semibold'>Giftcard Company</div>
              <div className='text-sm font-light'>Penancangan Lama Street</div>
              <div className='text-sm font-light'>Serang City, Banten</div>
              <div className='space-y-3'>
                <div className='text-sm font-bold'>Contact Us:</div>
                <div className='text-md font-light'>🤙 081283511714</div>
                <div className='text-md font-light'>💬 hello@giftcardcompany.com</div>
              </div>
            </div>
          </div>
        </div>

        {items.buy && (
          <div className='fixed overflow-hidden bg-black/50 inset-0 flex justify-center items-center'>
            <div className='w-[300px] h-[100px] bg-white hover:bg-pink-300 rounded-2xl flex justify-center items-center cursor-pointer' onClick={items.setBuy}>
              <div className='text-3xl font-semibold'>Congratulations</div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
