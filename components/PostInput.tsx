'use client';
import React, { useState } from 'react'
import ProfilePhoto from './shared/ProfilePhoto'
import { Input } from './ui/input'
import { PostDailog } from './PostDailog'
import { LoginAlert } from './LoginAlert';


function PostInput({ user }: { user: any }) {
    const [open, setOpen] = useState<boolean>(false);
    const inputHandler = () => {
        setOpen(true);
    }
    return (
        <div className='bg-white p-4 m-2 md:m-0 border border-gray-300 rounded-lg'>
            <div className='flex items-center gap-3'>
                <ProfilePhoto src={user ? user?.imageUrl! : "/man.png"} />
                <Input
                    type="text"
                    placeholder='Create a post'
                    className='rounded-full hover:bg-white h-12 cursor-pointer outline-none bg-muted'
                    onClick={inputHandler}
                />
                {user ? (
                    <PostDailog setOpen={setOpen} open={open} src={user?.imageUrl} user={user} />
                ) : (
                    <LoginAlert setOpen={setOpen} open={open}/>
                )}
            </div>

        </div>
    );
}

export default PostInput