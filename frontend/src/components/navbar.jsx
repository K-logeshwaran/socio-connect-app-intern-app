import { Sun, Moon, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { useTheme } from "@/components/theme-provider"


import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"



import { useEffect, useState } from 'react';
import { MyBio} from './side-bar';
import { Link, useNavigate } from 'react-router-dom';

function ThemeToggleButton() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);


    // When mounted, client-only
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Avoid rendering until mounted on client
        return (
            <Button variant="ghost" size="icon" aria-label="Toggle theme" disabled />
        );
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
            {theme === 'light' ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
        </Button>
    );
}

export function Header() {
    const navigate = useNavigate()
    

    return (
        <Sheet>
            <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60  p-9" >
                {/* Left: Breadcrumb or brand link */}
                
                <Link to={"/"} className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
                    SocioHub
                </Link>

                <SheetContent>
                    <SheetTitle>

                    <div className='h-8'></div>
                    </SheetTitle>
                    <MyBio/>
                    {/* <BioSection /> */}
                </SheetContent>



                {/* Right-hand controls */}

                <div className="ml-auto  items-center gap-4 pr-6 flex">

                    <ThemeToggleButton></ThemeToggleButton>

                    {/* User menu */}
                    <SheetTrigger  >
                        <Avatar className="h-10 w-10 cursor-pointer md:hidden">
                            <AvatarImage src="/avatar.png" alt="User avatar" />
                            <AvatarFallback>UN</AvatarFallback>
                        </Avatar>
                    </SheetTrigger>
                    <Avatar onClick={()=>{navigate("/settings")}} className="h-10 w-10 cursor-pointer hidden md:block">
                        <AvatarImage src="/avatar.png" alt="User avatar" />
                        <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                </div>

            </header>
        </Sheet>

    );
}