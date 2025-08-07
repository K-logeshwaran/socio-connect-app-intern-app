import { Header } from "@/components/navbar";
import { OthersProfile } from "@/components/side-bar";
import { BASE_URL } from "@/utils/func";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserProfile() {
    let param = useParams()
    let [user, setUser] = useState({name:"",bio:""})

    useEffect(() => {
        async function fetchUserProfile(userId) {
            try {
                const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.msg || 'Failed to fetch user profile');
                }

                const userProfile = await response.json();
                setUser(userProfile)
                console.log('User Profile:', userProfile);
                // Use userProfile.name, userProfile.bio, userProfile.email, etc.
            } catch (error) {
                console.error('Error fetching user profile:', error.message);
            }
        }
        fetchUserProfile(param.id)
    }, [])

    return (
        <main className="min-w-screen min-h-screen">
            <Header />
            <div className="min-w-full  flex justify-center pt-10">

                <OthersProfile
                    card={true}
                    name={user.name}
                    bio={user.bio}

                />


            </div>
        </main>
    );
}

export default UserProfile;