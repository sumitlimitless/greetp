import { MessageCircleMore, Repeat, Send, ThumbsUp } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { IPostDocument } from '@/models/post.model';
import { useUser } from '@clerk/nextjs';
import CommentInput from './CommentInput';
import Comments from './Comments';

function SocialOptions({ post }: { post: IPostDocument }) {
    const { user } = useUser();
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState<string[] | undefined>(post.likes);
    const [commentOpen, setCommentOpen] = useState(false);

    useEffect(() => {
        const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
        if (user && likedPosts[post._id]) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [post._id, user]);

    const likeOrDislikeHandler = async () => {
        if (!user) throw new Error('User not authenticated');

        const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
        likedPosts[post._id] = !liked;
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));

        const tempLikes = likes;
        const newLikes = liked ? (likes ? likes.filter(userId => userId !== user.id) : []) : [...(likes ?? []), user.id];
        setLiked(!liked);
        setLikes(newLikes);

        const res = await fetch(`/api/posts/${post._id}/${liked ? 'dislike' : 'like'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: user.id }),
        });
        if (!res.ok) {
            setLiked(liked);
            setLikes(tempLikes);
            throw new Error('Failed to like or dislike');
        }
    };

    return (
        <div>
            <div className='text-sm mx-2 p-2 flex items-center justify-between border-b border-gray-300'>
                {(likes && likes.length > 0) && (
                    <p className='text-xm text-gray-500 hover:text-blue-500 hover:underline hover:cursor-pointer'>{likes.length} likes</p>
                )}
                {(post.comments && post.comments.length > 0) && (
                    <p onClick={() => setCommentOpen(!commentOpen)} className='text-xm text-gray-500 hover:text-blue-500 hover:underline hover:cursor-pointer'>{post.comments.length} message</p>
                )}
            </div>
            <div className='flex items-center m-1 justify-between'>
                <Button
                    onClick={likeOrDislikeHandler}
                    variant={'ghost'}
                    className='flex items-center gap-1 rounded-lg text-gray-600 hover:text-black'
                >
                    <ThumbsUp className={liked ? 'fill-[#378FE9]' : ''} />
                    <p className={liked ? 'text-[#378FE9]' : ''}>Like</p>
                </Button>
                <Button onClick={() => setCommentOpen(!commentOpen)} variant={'ghost'} className='flex items-center gap-1 rounded-lg text-gray-600 hover:text-black'>
                    <MessageCircleMore />
                    <p>Message</p>
                </Button>
                <Button variant={'ghost'} className='flex items-center gap-1 rounded-lg text-gray-600 hover:text-black'>
                    <Repeat />
                    <p>Repost</p>
                </Button>
                <Button variant={'ghost'} className='flex items-center gap-1 rounded-lg text-gray-600 hover:text-black'>
                    <Send />
                    <p>Share</p>
                </Button>
            </div>
            {commentOpen && (
                <div className='p-4'>
                    <CommentInput postId={post._id} />
                    <Comments post={post} />
                </div>
            )}
        </div>
    );
}

export default SocialOptions;
