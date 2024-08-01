import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Post } from '@prisma/client'
import React from 'react'
import { deleteBlogPost } from '../_actions/BlogFormActions'
import DeleteButton from './DeleteButton'
import Link from 'next/link'

const Feed = ({ results }: { results: Post[] }) => {
    return (
        <div>
            {results.map((result) => (
                <BlogCard
                    key={result.id}
                    id={result.id}
                    title={result.title}
                    desc={result.desc}
                />
            ))}
        </div>
    )
}

const BlogCard = ({ id, title, desc }: { id: string, title: string, desc: string }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{desc}</p>
            </CardContent>
            <CardFooter className='space-x-2'>
                <DeleteButton id={id} />
                <Button asChild>
                    <Link href={`/post/${id}`}>Edit</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default Feed

