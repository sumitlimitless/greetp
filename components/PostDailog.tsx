import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTitle,
    DialogHeader,
} from "@/components/ui/dialog";
import ProfilePhoto from "./shared/ProfilePhoto";
import { Textarea } from "./ui/textarea";
import { Images, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { readFileAsDataUrl } from "@/lib/utils";
import Image from "next/image";
import { createPostAction } from "@/lib/serveractions";
import { toast } from "sonner";


export function PostDailog({ setOpen, open, src, user }: { setOpen: any; open: boolean; src: string; user: any }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<string>("");
    const [inputText, setInputText] = useState<string>("");

    const changeHandler = (e: any) => {
        setInputText(e.target.value);
    };

    const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const dataUrl = await readFileAsDataUrl(file);
            setSelectedFile(dataUrl);
        }
    };

    const removeImageHandler = () => {
        setSelectedFile(""); // Clear selectedFile state to remove the image
    };

    const postActionHandler = async (formData: FormData) => {
        const inputText = formData.get("inputText") as string;
        try {
            await createPostAction(inputText, selectedFile);
        } catch (error) {
            console.log("error occured", error);
        }
        setInputText("");
        setOpen(false);
    };

    return (
        <Dialog open={open}>
            <DialogContent onInteractOutside={() => setOpen(false)} className="sm:max-w-[425px]">
                <DialogHeader>
                    <div onClick={() => setOpen(false)} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </div>
                    <DialogTitle className="flex gap-2">
                        <ProfilePhoto src={user ? user?.imageUrl! : "/man.png"} />
                        <div>
                            <h1>{user ? `${user?.firstName} ${user?.lastName}` : "Sumit Kumar Sharma"}</h1>
                            <p className="text-xs">Post to Anyone</p>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <form action={(formData) => {
                    const promise = postActionHandler(formData);
                    toast.promise(promise, {
                        loading: 'Creating post...',
                        success:'Post Created',
                        error:'Failed to create post'
                    })
                }}>
                    <div className="flex flex-col">
                        <Textarea
                            id="name"
                            name="inputText"
                            value={inputText}
                            onChange={changeHandler}
                            className="border-none text-lg focus-visible:ring-0"
                            placeholder="Type your message here."
                        />
                        <div className="my-4">
                            {selectedFile && (
                                <div className="relative">
                                    <Image src={selectedFile} alt="preview-image" height={200} width={100} className="w-full h-72 bg-cover outline-1" />
                                    <Button size={"icon"} className="absolute top-2 right-2 mt-2" onClick={removeImageHandler}>
                                        <X />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <div className="flex items-center gap-4">
                            <input ref={inputRef} onChange={fileChangeHandler} type="file" name="image" className="hidden" accept="image/*" />
                            <Button type="submit">Post</Button>
                        </div>
                    </DialogFooter>
                </form>
                <Button className="gap-2" onClick={() => inputRef?.current?.click()} variant={"ghost"}>
                    <Images className="text-blue-500" />
                    <p>Media</p>
                </Button>
            </DialogContent>
        </Dialog>
    );
}