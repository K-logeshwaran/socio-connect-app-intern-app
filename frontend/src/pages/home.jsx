
import SocialCard from "@/components/all-post-card";
import { MyBio } from "@/components/side-bar";
import { Header } from "@/components/navbar";
import PostCard from "@/components/post-card";

import { useEffect, useState } from "react";


import { BASE_URL, formatterDate } from "@/utils/func";

function HomePage() {
    const [posts, setPosts] = useState([]);
    const [change, setChange] = useState(false);
    const useChange = () => setChange(!change)
    useEffect(() => {

        fetch(`${BASE_URL}/api/posts`, {

        })
            .then(response => {
                if (!response.ok) throw new Error("Failed to create post");
                return response.json();
            })
            .then(data => {
                console.log(data);

                setPosts(data)
            })
            .catch(error => {
                console.error("Error:", error.message);
            });

    }, [change])



    function renderFallBack(name) {
        try {
            let names = name.split(" ")
            return (names[0][0] + names[1][0]).toUpperCase();
        } catch (err) {
            console.log(err);
            return name[0]
        }
    }
    return (
        <main>
            <Header />
            <section className="flex justify-around  pt-15">
                {/* Sidebar: show only on md+ screens */}
                <section className="w-2/7 h-100 hidden md:block">
                    <MyBio card={true} />
                </section>

                {/* Main Content: FULL WIDTH on mobile, 4/7 on md+ */}
                <section className="w-90 md:basis-4/7">
                    <PostCard runEffect={useChange}/>
                    <div className="flex flex-col gap-4 py-5">
                        <h2 className="text-4xl font-bold ">Feed</h2>
                        {
                            posts.map((e) => (<SocialCard
                                authorName={e.author.name}
                                content={e.content}
                                createdAt={formatterDate(e.createdAt)}
                                renderFallback={renderFallBack(e.author.name)}
                                authorId={e.author._id}
                            />))
                        }
                    </div>

                </section>
            </section>
        </main>

    );
}

export default HomePage;