import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Circle } from 'lucide-react';
import { toast } from 'sonner';
const BASE_URL = "http://localhost:5000"
const PostCard = ({runEffect}) => {
  const { user, token } = useAuth()
  const [content, setContent] = useState("");
  const maxLength = 500;
  const [isLoading, setLoading] = useState(false);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleClear = () => {
    setContent("");
  };

  const handlePost = () => {
    setLoading(true)
    if (content.trim()) {
      const postData = {
        content
      };

      fetch(BASE_URL + "/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(postData)
      })
        .then(response => {
          if (!response.ok) toast.error("Failed to create post");
          return response.json();
        })
        .then(data => {
          toast.success("Post Uploaded")
        })
        .catch(error => {
          toast.error("Error:", error.message);
        });

      setLoading(false)
      setContent("")
      runEffect()
    }
  };

  function renderFallBack() {
    let name = user.name
    try {
      let names = name.split(" ")
      return (names[0][0] + names[1][0]).toUpperCase();
    } catch (err) {
      console.log(err);
      return name[0]
    }
  }

  return (
    <Card className="w-full max-w-1xl mx-auto p-6 border border-gray-800 ">
      {/* Header with Avatar and Name */}
      <div className="flex items-center gap-3 mb-1">
        <Avatar className="w-12 h-12">
          <AvatarImage src="/placeholder-avatar.jpg" alt="Emma Wilson" />
          <AvatarFallback >{renderFallBack()}</AvatarFallback>
        </Avatar>
        <h2 className=" text-lg font-medium">{user.name}</h2>
      </div>

      {/* Textarea */}
      <div className="mb-1">
        <Textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={handleContentChange}
          maxLength={maxLength}
          className="min-h-[120px] bg-transparent border-none  placeholder: resize-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
        />
      </div>

      {/* Bottom section with character count and buttons */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-800">
        <span className=" text-sm">
          {maxLength - content.length}
        </span>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={handleClear}

          >
            Clear
          </Button>
          <Button
            onClick={handlePost}
            disabled={!content.trim() && !isLoading}
            className={"cursor-pointer"}
          >
            {isLoading ? <span className='animate-spin'><Circle /></span> : "Post"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
