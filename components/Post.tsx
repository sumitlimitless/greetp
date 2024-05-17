"use client"
import React from 'react';
import ProfilePhoto from './shared/ProfilePhoto';
import { useUser } from '@clerk/nextjs';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { IPostDocument } from '@/models/post.model';
import PostContent from './PostContent';
import SocialOptions from './SocialOptions';
import ReactTimeago from 'react-timeago';
import { deletePostAction } from '@/lib/serveractions';
import { toast } from 'sonner';
import { UserHover } from './UserHover';

function Post({ post }: { post: IPostDocument }) {
    const { user } = useUser();
    const fullName = post?.user?.firstName + " " + post?.user?.lastName;
    const loggedInUser = user?.id === post?.user?.userId;
    return (

        <div className='bg-white my-2 mx-2 md:mx-0 rounded-lg border border-gray-300'>
            <div className='flex gap-2 p-4'>
                <ProfilePhoto src={post?.user?.profilePhoto!} />
                <div className='flex items-center justify-between w-full'>
                    <div>
                        <h1 className='text-sm font-bold hover:underline'>{fullName}
                            {loggedInUser && <Badge variant="secondary" className="ml-2">You</Badge>}</h1>
                        <div className='text-xs text-gray-500'>
                            <UserHover user={user} key={post._id} post={post} />
                        </div>
                        <p className='text-xs text-gray-500'>
                            <ReactTimeago date={new Date(post.createdAt)} />
                        </p>
                    </div>
                </div>
                <div>
                    {
                        loggedInUser && (
                            <Button onClick={() => {
                                const promise = deletePostAction(post._id);
                                toast.promise(promise, {
                                    loading: 'Deleting post...',
                                    success: 'Post Deleted',
                                    error: 'Failed to delete post'
                                })
                            }} size={'icon'} className='rounded-full' variant={'outline'}>
                                <Trash2 />
                            </Button>
                        )
                    }
                </div>
            </div>
            <PostContent post={post} />
            <SocialOptions post={post} />
        </div>
    )
}

export default Post