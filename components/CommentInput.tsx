import React, { useRef } from 'react'
import ProfilePhoto from './shared/ProfilePhoto'
import { useUser } from '@clerk/nextjs'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { createCommentAction } from '@/lib/serveractions'
import { toast } from 'sonner'

const CommentInput = ({ postId }: { postId: string }) => {
    const { user } = useUser();
    const formRef = useRef<HTMLFormElement>(null);

    const commentActionHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!user) throw new Error('User not authenticated');
            await createCommentAction(postId, new FormData(e.currentTarget));
            const inputField = formRef.current?.querySelector<HTMLInputElement>('input[name="inputText"]');
            if (inputField) {
                inputField.value = '';
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form
            ref={formRef}
            onSubmit={(e) => {
                e.preventDefault();
                const promise = commentActionHandler(e); // Call the function here
                toast.promise(promise, {
                    loading: 'Creating comment...',
                    success: 'Comment created',
                    error: 'Failed to create comment'
                });
            }}
        >
            <div className='flex items-center gap-2'>
                <ProfilePhoto src={user?.imageUrl!} />
                <Input
                    type="text"
                    name="inputText"
                    placeholder='Add a comment'
                    className='rounded-full outline-none'
                />
                <Button type='submit' className='rounded-full'>Send</Button>
            </div>
        </form>
    )
}

export default CommentInput;
