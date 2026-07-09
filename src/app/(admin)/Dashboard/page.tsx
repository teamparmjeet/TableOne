import React from 'react'
import Image from 'next/image'
export default function page() {
  return (
    <div className=' flex justify-center items-center h-svh'>
      <Image
        src="/Group 1.png"
        alt="Table One"
        width={500}
        height={500}
        priority
        className="object-contain"
      />
    </div>
  )
}
