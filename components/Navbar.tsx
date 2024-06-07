import React from 'react'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from './ui/button'
import Image from 'next/image'


function Navbar ({ user }: { user: any }) {
  return (
    <div className='fixed w-full bg-white z-50 shadow-xl'>
      <div className='flex items-center max-w-6xl justify-between h-14 mx-auto px-3 rounded-md'>
        <div className='flex items-center gap-2'>
          <Image src="/logo.png" alt="Logo"
            width={35}
            height={35}
            className='rounded-md'
          />
          <div className='md:block hidden'>
          {/*SearchInput*/}
          </div>
        </div>
        <div className='item center justify-center text-black font-bold text-xl'>
Greetp Social Media Platform
        </div>
        <div className='flex items-center gap-5'>
          <div className='md:block hidden justify-center item items-center text-sm'>
           {/*NavItems */}
          {user ? `${user.firstName} ${user.lastName}` : ""}
          </div>
          <div>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Button className='rounded-full' variant={'secondary'}>
                <SignInButton />
              </Button>
            </SignedOut>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar