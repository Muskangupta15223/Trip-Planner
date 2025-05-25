import React from 'react'
import { Button } from '@/components/ui/button'

const Header = () => {
  return (
    <div className='flex p-5 justify-between items-center bg-emerald-200 w-full'>
      <img src="/logo.svg" />
      <div>
        <Button className=' text-l p-4 text-white font-m rounded-l'>Sign In</Button>
      </div>
    </div>
  )
}

export default Header
