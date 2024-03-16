import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/layout'
import Giftcard from '@/components/giftcard'
import useItems from '@/stores/useItems'
import useAuth from '@/stores/useAuth'
import { useEffect } from 'react'

export default function Cards({ }) {
  const items = useItems();
  const auth = useAuth();

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
      <div className='flex justify-between px-2 mt-4'>
        <div className='flex space-x-4'>
          <div>
            <div className='text-xs font-semibold'>Category:</div>
            <select className='border-2'>
              <option>F&B</option>
              <option>Hotel</option>
              <option>Activity</option>
            </select>
          </div>
          <div>
            <div className='text-xs font-semibold'>Price Range</div>
            <select className='border-2'>
              <option>$0 - $10</option>
              <option>$10 - $50</option>
              <option>$50 - $100</option>
              <option>$100 - $250</option>
              <option>&gt;$250</option>
            </select>
          </div>
        </div>
        <div>
          <div className='text-xs font-semibold'>Sort by:</div>
          <select className='border-2' onChange={(e) => items.sort(e.target.value)}>
            <option value="nameaz">Name A to Z</option>
            <option value="nameza">Name Z to A</option>
            <option value="pricehl">Price from high to low</option>
            <option value="pricelh">Price from low to high</option>
          </select>
        </div>
      </div>
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
