import { IPostDocument } from '@/models/post.model'
import React from 'react'
import ImageViewer from './ImageViewer'

function PostContent({ post }: { post: IPostDocument }) {
    return (
        <div className='my-3'>
            <p className='my-3 px-4'>{post?.description}</p>
            {
                <ImageViewer post={post}/>
            }
        </div>
    )
}

export default PostContent