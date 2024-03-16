import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/layout'
import Giftcard from '@/components/giftcard'
import { useQuery } from '@tanstack/react-query'
import useAuth from '@/stores/useAuth'
import { useEffect, useState } from 'react'
import useItems from '@/stores/useItems'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ }) {
  const auth = useAuth();
  const items = useItems();
  
  useEffect(() => {
    if (auth.token && items.data.length === 0) {
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/com.reloadly.giftcards-v1+json',
          Authorization: `Bearer ${auth.token}`
        }
      };
    
      fetch('https://giftcards-sandbox.reloadly.com/products', options)
        .then(response => response.json())
        .then(json => items.setItems(json.content))
    }
  }, [auth.token, items])

  return (
    <Layout>
      <div className='relative w-full h-[254px]'>
        <Image src='/dummy.jpeg' fill className='object-cover' alt='hero' />
      </div>
      <div className='text-3xl font-semibold px-2 my-8'>Featured Giftcard</div>
      <div className='grid grid-cols-5 gap-4 px-2 py-8'>
        {items.data.length > 0 ? (
          <>
            {items.data.map((x, id) => (
              <Giftcard key={x} data={x} />
            ))}
          </>
        ) : (
          <div className='col-span-5 text-center py-8'>Loading</div>
        )}
      </div>
    </Layout>
  )
}
