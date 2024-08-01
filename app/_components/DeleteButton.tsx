'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { deleteBlogPost } from '../_actions/BlogFormActions'

const DeleteButton = ({ id }: { id: string }) => {
    return (
        <Button
            onClick={() => deleteBlogPost({ id })}
            className='bg-destructive'

        >
            Delete Me
        </Button>
    )
}

export default DeleteButton
