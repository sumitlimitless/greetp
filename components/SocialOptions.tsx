import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { MessageCircleMore, Repeat, Send, ThumbsUp } from 'lucide-react';
import { IPostDocument } from '@/models/post.model';
import { useUser } from '@clerk/nextjs';
import CommentInput from './CommentInput';
import Comments from './Comments';
import Lottie from 'react-lottie';

const SocialOptions = ({ post }: { post: IPostDocument }) => {
    const { user } = useUser();
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(post.likes);
    const [commentOpen, setCommentOpen] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);
    const [animationData, setAnimationData] = useState(null);
    const userHasLiked = user ? likes?.includes(user.id) : false;

    useEffect(() => {
        const fetchAnimationData = async () => {
            const res = await fetch('/animation.json');
            const data = await res.json();
            setAnimationData(data);
        };
        fetchAnimationData();
    }, []);

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const likeOrDislikeHandler = async () => {
        if (!user) throw new Error('User not authenticated');
        const tempLiked = liked;
        const tempLikes = likes;
        const dislike = likes?.filter((userId) => userId !== user.id);
        const like = [...(likes ?? []), user.id];
        const newLike = liked ? dislike : like;

        setLiked(!liked);
        setLikes(newLike);
        if (!liked) setShowAnimation(true);

        const res = await fetch(`/api/posts/${post._id}/${liked ? 'dislike' : 'like'}`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(user.id),
        });
        if (!res.ok) {
            setLiked(tempLiked);
            throw new Error('Failed to like or dislike');
        }

        const fetchAllLikes = await fetch(`/api/posts/${post._id}/like`);
        if (!fetchAllLikes.ok) {
            setLikes(tempLikes);
            throw new Error('Failed to fetch like');
        }

        const likeData = await fetchAllLikes.json();
        setLikes(likeData);
    }

    return (
        <div>
            <div className='text-sm mx-2 p-2 flex items-center justify-between border-b border-gray-300'>
                {likes && likes.length > 0 && (
                    <p className='text-xm text-gray-500 hover:text-blue-500 hover:underline hover:cursor-pointer'>
                        {likes.length} likes
                    </p>
                )}
                {post.comments && post.comments.length > 0 && (
                    <p onClick={() => setCommentOpen(!commentOpen)} className='text-xm text-gray-500 hover:text-blue-500 hover:underline hover:cursor-pointer'>
                        {post.comments.length} message
                    </p>
                )}
            </div>
            <div className='flex items-center m-1 justify-between'>
                <Button
                    onClick={likeOrDislikeHandler}
                    variant={'ghost'}
                    className='flex items-center gap-1 rounded-lg text-gray-600 hover:text-black'>
                    {showAnimation && animationData ? (
                        <Lottie
                            options={defaultOptions}
                            height={70}
                            width={70}
                            eventListeners={[
                                {
                                    eventName: 'complete',
                                    callback: () => setShowAnimation(false),
                                },
                            ]}
                        />
                    ) : (
                        userHasLiked ? (
                            <svg
                                width="25"
                                height="25"
                                viewBox="0 0 25 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-blue-500 cursor-pointer"
                            >
                                <path
                                    d="M2 9h3v12H2a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1zm5.293-1.293l6.4-6.4a.5.5 0 0 1 .654-.047l.853.64a1.5 1.5 0 0 1 .553 1.57L14.6 8H21a2 2 0 0 1 2 2v2.104a2 2 0 0 1-.15.762l-3.095 7.515a1 1 0 0 1-.925.619H8a1 1 0 0 1-1-1V8.414a1 1 0 0 1 .293-.707z"
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        ) : (
                            <ThumbsUp />
                        )
                    )}
                    <p className={`${liked && 'text-[#378FE9]'}`}>Like</p>
                </Button>
                <Button onClick={() => setCommentOpen(!commentOpen)} variant={'ghost'} className='flex items-center gap-1 rounded-lg text-gray-600 hover:text-black'>
                    <MessageCircleMore />
                    <p>Message</p>
                </Button>
            </div>
            {commentOpen && (
                <div className='p-4'>
                    <CommentInput postId={post._id} />
                    <Comments post={post} />
                </div>
            )}
        </div>
    )
}

export default SocialOptions;