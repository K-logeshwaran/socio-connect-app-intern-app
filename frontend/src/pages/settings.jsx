import SocialCard from "@/components/all-post-card";
import { Header } from "@/components/navbar";
import { BioSection, MyBio } from "@/components/side-bar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/context/AuthContext";
import { BASE_URL, formatterDate, renderFallBack } from "@/utils/func";
import { useEffect, useState } from "react";








function MyPosts() {
    const { user, token } = useAuth()
    const [myPosts, setMyPosts] = useState([]);
    const [change,setChange] = useState(false)
    const useChange = ()=>setChange(!change)
    useEffect(() => {
        const fetchPostsByUser = async (userId, token) => {
            try {
                const response = await fetch(`${BASE_URL}/api/posts/user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const posts = await response.json();
                console.log(posts);

                setMyPosts(posts)
                return posts;
            } catch (error) {
                console.error("Failed to fetch posts:", error);
                return null;
            }
        };


        fetchPostsByUser(user.id, token)

    }, [change])
    return (
        <main>
            <Header />
            <section className="hidden md:flex justify-around  pt-15 ">
                {/* Sidebar: show only on md+ screens */}
                <section className="w-2/7 h-100 hidden md:block">
                    <BioSection card={true} />

                </section>

                {/* Main Content: FULL WIDTH on mobile, 4/7 on md+ */}
                <section className="w-90 md:basis-4/7 gap-4 pb-5 flex flex-col">

                    <h1 className="scroll-m-20  text-4xl font-extrabold tracking-tight text-balance mb-5">
                        📝 My Posts
                    </h1>

                    {
                        myPosts.map((e => <SocialCard
                            key={e._id}
                            myPost={true}
                            authorName={user.name}
                            content={e.content}
                            postId={e._id}
                            renderFallback={renderFallBack(user.name)}
                            createdAt={formatterDate(e.createdAt)}
                            reRender = {useChange}
                        />))
                    }




                </section>
            </section>

            {/* mobile view */}
            <section className="md:hidden min-w-screen p-3 pt-10 flex justify-center align-middle">

                <Tabs defaultValue="settings" className="w-[400px] ">
                    <div className="min-w-full  flex justify-center mb-5">
                        <TabsList className={" min-w-full"} >
                            <TabsTrigger value="settings">Settings ⚙️  </TabsTrigger>
                            <TabsTrigger value="posts"> My Posts  📝</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="settings">
                        <BioSection card={true} />
                    </TabsContent>
                    <TabsContent value="posts">

                        <h1 className="scroll-m-20  text-2xl font-extrabold tracking-tight text-balance mb-5">
                            📝 My Posts
                        </h1>
                        <div className="flex flex-col gap-5 pb-3">

                            <SocialCard myPost={true} />
                            <SocialCard myPost={true} />
                            <SocialCard myPost={true} />
                            <SocialCard myPost={true} />
                        </div>


                    </TabsContent>
                </Tabs>
            </section>
        </main>
    );
}

export default MyPosts;