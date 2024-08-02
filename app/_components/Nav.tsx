'use client'
import { Button } from '@/components/ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

const Nav = () => {
    const { data: session, status } = useSession()
    return (
        <div className='fixed top-0 left-0 right-0 h-[5rem] bg-slate-500'>
            {
                !session ?
                    <Button
                        onClick={() => signIn('github')}
                    >
                        Sign In
                    </Button>
                    :
                    <>
                        <div>
                            Logged In
                        </div>
                        <Button onClick={() => signOut()}>Log Out</Button>
                    </>
            }
        </div>
    )
}

export default Nav
