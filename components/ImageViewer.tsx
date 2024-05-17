'use client'
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { IPostDocument } from '@/models/post.model'
import Image from 'next/image';

export default function ImageViewer({ post }: { post: IPostDocument }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                {
                    post?.imageUrl && (
                        <Image
                            src={post?.imageUrl}
                            width={500}
                        height={500}
                        alt="posted-image"
                        className='w-full mx-auto'
                        />
                    )
                }
            </SheetTrigger>
            <SheetContent side="bottom">
                <SheetHeader>
                    <SheetTitle>Show Image</SheetTitle>
                    <SheetDescription className='mb-4 w-full flex justify-center items-center'>
                    {
                    post?.imageUrl && (
                        <Image
                            src={post?.imageUrl}
                            width={100}
                            height={100}
                            alt="posted-image"
                            className='w-full rounded-md mt-2 cursor-pointer object-contain h-[500px]'
                            unoptimized
                        />
                    )
                }
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}
