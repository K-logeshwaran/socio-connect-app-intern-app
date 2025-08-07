import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from './ui/textarea';
import { useEffect, useState } from 'react';
import { LoaderCircle, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

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
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner';
import { BASE_URL, renderFallBack } from '@/utils/func';



const AlertPopUpBtn = ({ handleDelete }) => (<AlertDialog>
    <AlertDialogTrigger className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-xs  bg-red-500 text-white cursor-pointer hover:bg-red-700 min-w-fit px-2"}>
        Delete Account
    </AlertDialogTrigger>
    <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete()} className={"bg-red-500 hover:bg-red-700 text-white"}>
                continue
            </AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
</AlertDialog>)

export function BioSection({ card }) {

    const [isEditBio, setisEditBio] = useState(false);
    const [bioContent, setBioContent] = useState("")
    const [loading, setLoading] = useState(false)
    const [isBioChanged, setIsBioChanged] = useState(false)
    const [changedUserD, setChangedUserD] = useState(false)
    const maxLength = 120
    const { updateUser, user, logout, token } = useAuth()
    const useBio = () => setIsBioChanged(!isBioChanged)


    function handleBioUpdate() {

        setLoading(true)
        fetch(`${BASE_URL}/api/users/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                bio: bioContent
            })
        })
            .then(res => res.json())
            .then(data => {
                updateUser(data)
                setChangedUserD(data)
                toast.success("Bio Updated 🚀")

            })
            .catch(err => {
                toast.error("Bio Updated failed 📉")
                console.error('Error:', err);
            });
        setLoading(false)
        useBio()
        setisEditBio(false)

    }


    async function deleteUserAccount() {
        try {

            const response = await fetch(`${BASE_URL}/api/users/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Send token for authentication
                }
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.msg || 'Failed to delete user');
            }

            console.log('Success:', result.msg);
            // Optional: Clear localStorage and redirect to homepage or login
            toast.success("Account Deleted")
            setTimeout(() => {
                logout()
            }, 900);

        } catch (error) {
            console.error('Error:', error.message);
        }
    }




    function renderBio(bio) {
        if (bio == "") return "Your Bio is not set Please Update.."
        return bio
    }

    useEffect(() => {
        const userId = user.id; // Replace with actual user ID

        fetch(`${BASE_URL}/api/users/${userId}`)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then(data => {
                console.log('User Profile: after', data);
                updateUser(data)
                setChangedUserD(data)
            })
            .catch(err => {
                console.error('Error fetching profile:', err.message);
            });

    }, []);

    return (
        <div className={`flex flex-col gap-1.5 p-4 ${card ? "bg-card" : ""} border-1 rounded-sm`}>



            <div className='flex gap-3 pb-7'>
                <Avatar className="h-10 w-10 cursor-pointer">
                    <AvatarImage src="/avatar.png" alt="User avatar" />
                    <AvatarFallback>{renderFallBack(user.name)}</AvatarFallback>
                </Avatar>
                <h2 className='scroll-m-20  text-2xl font-semibold tracking-tight first:mt-0 self-center'>{user.name}</h2>
            </div>



            {
                isEditBio === true ?
                    <div className='flex-col  pb-7'>
                        <h2 className='scroll-m-20 border-b pb-2 mb-3 text-1xl font-semibold tracking-tight first:mt-0 '>Edit Bio</h2>
                        <Textarea
                            placeholder="About You..."
                            className={"mb-1"}
                            maxLength={maxLength}
                            value={bioContent}
                            onChange={(e) => setBioContent(e.target.value)}
                        />
                        <div className="ml-2 mb-4 text-sm">
                            {maxLength - bioContent.length}
                        </div>
                        <Button disabled={!bioContent.trim()} className={"w-full cursor-pointer"} onClick={handleBioUpdate}>

                            {
                                loading &&
                                <>
                                    <span className='animate-spin'>
                                        <LoaderCircle />
                                    </span>
                                    <p>Updating...</p>
                                </>

                            }
                            {
                                !loading &&
                                <p>Update Bio</p>
                            }
                        </Button>
                    </div> :
                    <div className='flex-col gap-3 pb-7'>

                        <h2 className='scroll-m-20 border-b pb-2 text-1xl font-semibold tracking-tight first:mt-0 '>Bio</h2>
                        <p className='leading-7 [&:not(:first-child)]:my-3 pb-3'>
                            {renderBio(changedUserD.bio)}
                        </p>

                        <Button className={"w-full cursor-pointer"} onClick={() => setisEditBio(true)}>Update Bio</Button>
                    </div>
            }

            <div className='flex justify-around gap-5'>

                <Button onClick={() => {
                    logout()
                    toast.success("Account Logged Out!")
                }} className={" cursor-pointer min-w-25  bg-sky-500 text-white hover:bg-sky-700 "}>Logout</Button>
                <AlertPopUpBtn
                    handleDelete={deleteUserAccount}
                />

            </div>



        </div>
    );
}

export function MyBio({ card }) {

    const navigate = useNavigate()
    const { user } = useAuth()
    function renderBio() {
        if (user.bio == "") return "Your Bio is not set Please Update.."
        return user.bio
    }



    return (
        <div className={`flex flex-col gap-1.5 p-4 ${card ? "bg-card" : ""} border-1 rounded-sm`}>
            <div className='flex justify-between'>
                <div className='flex gap-3 pb-7'>
                    <Avatar className="h-10 w-10 cursor-pointer">
                        <AvatarImage src="/avatar.png" alt="User avatar" />
                        <AvatarFallback>
                            {renderFallBack(user.name)}
                        </AvatarFallback>
                    </Avatar>
                    <h2 className='scroll-m-20  text-1xl font-semibold tracking-tight first:mt-0 self-center'>{user.name}</h2>
                </div>
                <div className='mt-2 mr-2 cursor-pointer'>

                    <Settings onClick={() => navigate("/settings")} />
                </div>
            </div>


            <div className='flex-col gap-3 pb-7'>

                <h2 className='scroll-m-20 border-b pb-2 text-1xl font-semibold tracking-tight first:mt-0 '>Bio</h2>
                <p className='leading-7 [&:not(:first-child)]:my-3 pb-3'>
                    {
                        renderBio()
                    }
                </p>
            </div>





        </div>
    );
}

export const OthersProfile = ({ card, name, bio }) => {
    return (
        <div className={`flex flex-col gap-1.5 p-4 ${card ? "bg-card" : ""} border-1 rounded-sm min-w-1/4`}>

            <div className='flex gap-3 pb-7'>
                <Avatar className="h-10 w-10 cursor-pointer">
                    <AvatarImage src="/avatar.png" alt="User avatar" />
                    <AvatarFallback>
                        {renderFallBack(name)}
                    </AvatarFallback>
                </Avatar>
                <h2 className='scroll-m-20  text-1xl font-semibold tracking-tight first:mt-0 self-center'>{name}</h2>
            </div>




            <div className='flex-col gap-3 pb-7'>

                <h2 className='scroll-m-20 border-b pb-2 text-1xl font-semibold tracking-tight first:mt-0 '>Bio</h2>
                <p className='leading-7 [&:not(:first-child)]:my-3 pb-3'>
                    {
                        bio
                    }
                </p>
            </div>


        </div>
    );
}



