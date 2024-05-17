import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { IPostDocument } from "@/models/post.model";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays } from "lucide-react";
import Image from 'next/image';

export function UserHover({ post, user }: { post: IPostDocument, user: any }) {
    const fullName = post?.user?.firstName + " " + post?.user?.lastName;
    const loggedInUser = user?.id === post?.user?.userId;
    const verified = post?.user?.userName === "sumitlimitless"; // You seem to have an incomplete expression here
    const ClerkUser = post?.user?.userId;

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <p className='text-xs text-gray-500 hover:underline hover:text-black cursor-pointer'>@{post?.user?.userName || "username"}</p>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                    <Avatar>
                        <AvatarImage src={post?.user?.profilePhoto!} />
                        <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">@{post?.user?.userName || "username"}</h4>
                        <p className="text-sm">
                            <span>{fullName}</span>
                            {verified ? (
                                <div className="inline-flex items-center">
                                    <Image
                                        src="/verify.png"
                                        alt="Verified Badge"
                                        height={16}
                                        width={16}
                                        className="w-4 h-4 mr-1 rounded-full"
                                    />
                                    <span className="text-xs text-muted-foreground">Verified</span>
                                </div>
                            ) : (
                                <div className="inline-flex items-center">
                                    <Image
                                        src="/blue.png"
                                        alt="Blue Badge"
                                        height={16}
                                        width={16}
                                        className="w-4 h-4 mr-1 rounded-full"
                                    />
                                    <span className="text-xs text-muted-foreground">Verified</span>
                                </div>
                            )}
                        </p>
                        <div className="flex items-center pt-2">
                            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                            <span className="text-xs text-muted-foreground">
                            <b>Posted on&nbsp;</b>
                                    {(new Date(post.createdAt)).toLocaleDateString('en-IN')}
                            </span>
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}