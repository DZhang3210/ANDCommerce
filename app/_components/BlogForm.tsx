'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useTransition } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { addBlogPost, editBlogPost } from '../_actions/BlogFormActions'

function wait(duration: number) {
    return new Promise(resolve => setTimeout(resolve, duration))
}


const BlogForm = ({ id, desc, title }: { id?: string, desc?: string, title?: string }) => {
    const [error, action] = useFormState((id && desc && title) ? editBlogPost : addBlogPost, {})

    return (
        <>
            <form action={action}>
                <Label htmlFor='title'>Title</Label>
                <Input type="text" id="title" name="title" defaultValue={title || ""} required></Input>
                {error?.title && <div className='text-destructive'>{error?.title}</div>}
                <Label htmlFor='desc'>Desc</Label>
                <Input type="text" id="desc" name="desc" defaultValue={desc || ""} required></Input>
                {error?.desc && <div className='text-destructive'>{error?.desc}</div>}
                {id && <input className='hidden' name="id" readOnly value={id}></input>}
                <SubmitButton />

            </form>
        </>
    )
}

const SubmitButton = () => {
    const { pending } = useFormStatus()
    return (

        <Button disabled={pending} type="submit">
            Submit your form
        </Button>
    )
}

export default BlogForm
