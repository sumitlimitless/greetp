import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import { IPostDocument } from "@/models/post.model";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home({ post }: { post: IPostDocument | undefined }) {
  const user = await currentUser();

  return (
    <div className="pt-20">
      <div className="max-w-6xl mx-auto flex justify-between gap-8">
        {/* Sidebar */}
        <Sidebar user={user} />
        {/* Feed */}
        <Feed user={user} />
      </div>
    </div>
  );
}
