import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/utils/func";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";


// Adjust these as needed based on your actual icon imports/assets.

export default function SocialCard({ authorId, reRender, myPost, postId, createdAt, authorName, content, renderFallback }) {
  const { token } = useAuth()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const deletePost = async () => {
    setLoading(true)
    try {

      const res = await fetch(`${BASE_URL}/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.msg.toString() || "Failed to delete post")
        throw new Error(data.msg || "Failed to delete post");
      }

      const result = await res.json();
      console.log("Post deleted:", result.msg);
      toast.success("Post Deleted Successfully 🚀")

      // Optionally re-fetch posts or remove the post from local state/UI
    } catch (err) {
      toast.error("Unknown Error deleting post");
      console.error("Error deleting post:", err);
    }
    setLoading(false)
    reRender();
  };

  return (
    <Card className="w-full max-w-1xl mx-auto p-6 border border-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/avatar1.jpg" alt="Alex Johnson" />
            <AvatarFallback >{renderFallback}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex flex-col cursor-pointer" onClick={() => navigate(`/user/${authorId}`)}>
              <span className="font-semibold text-base ">{authorName}</span>
              {/* <span className=" text-sm">@alexj</span> */}
            </div>
          </div>
        </div>
        <span className=" text-xs font-medium">{createdAt}</span>
      </div>
      {/* Post content */}
      <div className="mb-4">
        <p className=" text-lg leading-snug">
          {content}
        </p>
      </div>
      {/* Actions */}

      {/* feature not implemented yet */}
      {/* <button className="flex items-center gap-1  text-sm hover:text-pink-400 transition">
          <Heart size={18} className="mr-1" /> 15
        </button>
        <button className="flex items-center gap-1  text-sm hover:text-cyan-400 transition">
          <MessageCircle size={18} className="mr-1" /> 3
        </button> */}

      {
        myPost &&
        <div >
          <Button className={"bg-red-500 text-white cursor-pointer hover:bg-red-700 "} onClick={() => deletePost()}>
            {loading ? <span><LoaderCircle /></span> : "Delete Post"}

          </Button>
        </div>
      }



    </Card>
  );
}
