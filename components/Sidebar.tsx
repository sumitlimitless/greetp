import Image from 'next/image';
import React from 'react';
import ProfilePhoto from './shared/ProfilePhoto';
import { getAllPosts } from '@/lib/serveractions';
import { CalendarDays } from 'lucide-react';
import { IPostDocument } from '@/models/post.model';

const Sidebar = async ({ user }: { user: any }) => {
    const posts = await getAllPosts();

    // Filter posts to include only those with the current user's ID
    const userPosts = user ? posts.filter((post: IPostDocument) => post.user.userId === user.id) : [];

    return (
        <div className='hidden md:block w-[20%] h-fit border border-gray-300 bg-white rounded-lg'>
            <div className='flex relative flex-col items-center'>
                <div className='w-full h-16 overflow-hidden'>
                    <Image
                        src="/banner.jpg"
                        alt='Banner'
                        width={200}
                        height={200}
                        className='w-full h-full rounded-t cursor-pointer'
                    />
                </div>
                <div className='my-1 absolute top-10 left-[40%]'>
                    <ProfilePhoto src={user ? user.imageUrl : "/man.png"} />
                </div>
                <div className='border-b border-b-gray-300'>
                    <div className='p-2 mt-5 text-center'>
                        <h1 className='font-bold hover:underline cursor-pointer'>
                            {user ? `${user.firstName} ${user.lastName}` : "Sumit Kumar Sharma"}
                        </h1>
                        <p className='text-xs'>@{user ? user.username : 'officialgreetp'}</p>
                        <p className='text-xs items-center justify-center' style={{ display: 'flex', alignItems: 'center' }}>
                            {user && (
                                <>
                                    <CalendarDays className='h-4 w-4' style={{ fontSize: '0.25rem', marginRight: '0.25rem' }} />
                                    <b>Joined&nbsp;</b>
                                    {(new Date(user.createdAt)).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })}
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </div>
            <div className='text-xs '>
                <div className='w-full flex justify-between items-center px-3 py-2 hover:bg-gray-200 cursor-pointer'>
                    <p>Post Impression</p>
                    <p className='text-blue-500 font-bold'>88</p>
                </div>
                <div className='w-full flex justify-between items-center px-3 py-2 hover:bg-gray-200 cursor-pointer'>
                    <p>Posts</p>
                    <p className='text-blue-500 font-bold'>{userPosts.length}</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;