import Feed from '@/app/_components/Feed'
import prisma from '@/libs/db'
import React from 'react'

type ProfilePanelProps = {
    params: {
        profileID: string
    }
}

const ProfilePanel = async ({ params: { profileID } }: ProfilePanelProps) => {
    const results = (await prisma.user.findUnique({
        where: { id: profileID },
        select: {
            posts: {
                select: {
                    id: true,
                    title: true,
                    desc: true,
                    User: {
                        select: {
                            id: true,
                            name: true,
                            image: true
                        }

                    }
                }
            }
        }
    }))?.posts || []
    console.log("Results", results)
    return (
        <div>
            <Feed results={results} />
        </div>
    )
}

export default ProfilePanel
