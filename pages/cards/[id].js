import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/layout'
import Giftcard from '@/components/giftcard'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useItems from '@/stores/useItems'

export default function CardById({ }) {
  const router = useRouter();
  const items = useItems();
  const [detail, setDetail] = useState({
    name: '',
    price: '',
    description: '', // redeemInstruction.verbose
    image: '/giftcard.webp',
  });

  useEffect(() => {
    if (items.data.length > 0) {
      const item = items.data.find(item => item.productId.toString() === router.query.id);
      if (item) {
        setDetail({
          name: item.productName,
          price: item.fixedSenderDenominations,
          description: item.redeemInstruction.verbose,
          image: item.logoUrls[0]
        });
      }
    }
  }, [items.data, router.query.id])

  return (
    <Layout>
      <div className='px-2 py-4 text-2xl cursor-pointer' onClick={() => router.back ? router.back() : router.push('/')}>
        ⬅️ Go Back
      </div>
      <div>
        <div className='grid grid-cols-2 gap-8 px-2'>
          <div>
            <div className='w-full h-[480px] border-2 border-slate-100 rounded-t-md relative'>
              <Image src={detail.image} alt={'giftcard'} fill className='object-contain' />
            </div>
          </div>
          <div className='space-y-4'> 
            <div className='space-y-2'>
              <div className='text-3xl font-bold'>{detail.name}</div>
              <div className='text-xl font-semibold text-red-400'>{isNaN(parseInt(detail.price)) ? 'FREE' : `$${detail.price}`}</div>
            </div>
            <div className='pr-4 space-y-4'>
              <div className='space-y-2'>
                <div className='text-sm font-semibold'>Description:</div>
                <div className='text-xs font-light'>
                  {detail.description}
                </div>
              </div>
              
              <div className='space-y-2'>
                <div className='text-lg font-semibold'>
                  Terms and Condition
                </div>
                <div>
                  <h3 className='text-sm font-semibold'>Validity</h3>
                  <p className='text-xs font-light'>The Gift Card is valid for a period of 24 months from the date of activation. Unused balance will be forfeited upon expiry.</p>
                </div>
                <div>
                  <h3 className='text-sm font-semibold'>Redemption</h3>
                  <p className='text-xs font-light'>This card can be redeemed at any participating stores and online platforms associated with the &quot;Happy Choices&quot; network. For a full list of participating entities, please visit our website.</p>
                </div>
                <div>
                  <h3 className='text-sm font-semibold'>Non-refundable</h3>
                  <p className='text-xs font-light'>The Gift Card is not refundable or exchangeable for cash and cannot be returned or resold. Lost, stolen, or damaged cards will not be replaced.</p>
                </div>
                <div>
                  <h3 className='text-sm font-semibold'>Balance Inquiry</h3>
                  <p className='text-xs font-light'>Cardholders can check their balance by visiting our website or calling our customer service hotline. Balances will be updated after each transaction and displayed in the currency in which the card was issued.</p>
                </div>
              </div>
            </div>
            <div className='flex'>
              <div onClick={items.setBuy} className='bg-green-500 hover:bg-green-700 mb-32 text-white text-2xl px-6 py-3 rounded-lg cursor-pointer'>
                Buy now
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
