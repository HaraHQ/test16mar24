import Link from "next/link"

const { default: Image } = require("next/image")

const Giftcard = ({ data }) => {
  return (
    <Link href={`/cards/${data.productId}`} className='cursor-pointer group'>
      <div className='w-full h-[160px] border-b-2 border-slate-100 rounded-t-md relative group-hover:bg-slate-100'>
        <Image src={data.logoUrls[0]} alt={'giftcard'} fill objectFit="contain" />
      </div>
      <div className='w-full min-h-[100px] rounded-b-md bg-white p-2 group-hover:bg-slate-100'>
        <div className="text-sm font-semibold">{data.productName}</div>
        <div className="text-xs">{
          isNaN(parseInt(data.fixedSenderDenominations))
          ? 'Free'
          : `$${parseInt(data.fixedSenderDenominations)}`
        }</div>
      </div>
    </Link>
  )
}

export default Giftcard