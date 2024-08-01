import BlogForm from '@/app/_components/BlogForm'
import prisma from '@/libs/db'
import { redirect } from 'next/navigation'
import React from 'react'

const EditPage = async ({ params: { id } }: { params: { id: string } }) => {
    const post = await prisma.post.findUnique({ where: { id } })
    if (!post) {
        redirect("/")
    }
    return (
        <>
            <div>
                Edit your blog post
            </div>
            <BlogForm id={id} desc={post.desc} title={post.title} />
        </>
    )
}

export default EditPage
