'use server'

import prisma from '@/libs/db'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const getSchema = z.object({
    title: z.string({ message: 'Title is required' }).min(4, 'Title must be at least 4 characters long'),  // Ensures a title is provided
    desc: z.string({ message: 'Desc is required' }).min(4, 'Description must be at least 4 characters long')
})

export const addBlogPost = async (prevState: unknown, formData: FormData) => {
    // Convert FormData to a plain object
    const unvalidatedData = {
        title: formData.get("title"),
        desc: formData.get("desc")
    } as { title: string, desc: string }

    // Validate data against the schema
    const result = getSchema.safeParse(unvalidatedData)

    // Check if validation succeeded
    if (result.success === false) {
        console.log("Failed", result.error.formErrors.fieldErrors)
        console.log("Hello")
        return result.error.formErrors.fieldErrors
    }

    // Data is valid; proceed to create a new blog post
    try {
        const newPost = await prisma.post.create({
            data: {
                title: unvalidatedData.title,
                desc: unvalidatedData.desc
            }
        })
        console.log('Blog post created:', newPost)
        revalidatePath("/")
    } catch (error) {
        console.error('Error creating blog post:', error)
    }
}

export async function deleteBlogPost({ id }: { id: string }) {
    await prisma.post.delete({ where: { id } })
    revalidatePath("/")
}


const editSchema = z.object({
    title: z.string({ message: 'Title is required' }).min(4, 'Title must be at least 4 characters long'),  // Ensures a title is provided
    desc: z.string({ message: 'Desc is required' }).min(4, 'Description must be at least 4 characters long'),
    id: z.string({ message: "id must be known" })
})
export async function editBlogPost(prevState: unknown, formData: FormData) {
    // Convert FormData to a plain object
    const unvalidatedData = {
        id: formData.get("id"),
        title: formData.get("title"),
        desc: formData.get("desc")
    } as { title: string, desc: string, id: string }

    // Validate data against the schema
    const result = editSchema.safeParse(unvalidatedData)

    // Check if validation succeeded
    if (result.success === false) {
        console.log("Failure")
        return result.error.formErrors.fieldErrors
    }

    // Data is valid; proceed to create a new blog post
    try {
        const newPost = await prisma.post.update({
            where: { id: unvalidatedData.id },
            data: {
                title: unvalidatedData.title,
                desc: unvalidatedData.desc
            }
        })
        console.log('Blog post updated:', newPost)
        revalidatePath(`/post/${unvalidatedData.id}`)
        revalidatePath("/")
    } catch (error) {
        console.error('Error updating blog post:', error)
    }
}