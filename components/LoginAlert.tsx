import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { SignIn, SignInButton } from "@clerk/nextjs";

export function LoginAlert({ setOpen, open }: { setOpen: any; open: boolean }) {
  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Welcome To Greetp</AlertDialogTitle>
          <AlertDialogDescription>
            If you are new to Greetp app please register first in to your account to post. If you are already registered please login to post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <SignInButton />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
