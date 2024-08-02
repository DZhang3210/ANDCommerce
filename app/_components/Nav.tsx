'use client'
import { Button } from '@/components/ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Nav = () => {
    const { data: session, status } = useSession()
    return (
        <div className='fixed top-0 left-0 right-0 h-[5rem] bg-slate-500 flex gap-10 items-center text-4xl'>
            <Link href="/">
                Home
            </Link>
            {
                !session ?
                    <Button
                        onClick={() => signIn('github')}
                    >
                        Sign In
                    </Button>
                    :
                    <>
                        <div className='font-bold text-accent'>
                            Logged In
                        </div>
                        <Button onClick={() => signOut()}>Log Out</Button>
                    </>
            }
        </div>
    )
}

export default Nav
