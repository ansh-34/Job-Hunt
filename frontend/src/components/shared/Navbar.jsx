import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "An error occurred. Please try again.");
        }
    }
    return (
        <div className='bg-white shadow-sm'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <Link to="/">
                    <h1 className='text-2xl font-bold cursor-pointer transition-all duration-300 hover:scale-105'>
                        Job<span className='text-[#F83002] hover:text-[#ff4520] transition-colors'>Hunt</span>
                    </h1>
                </Link>
                <div className='flex items-center gap-8'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" className='hover:text-[#7209b7] transition-colors duration-300 hover:underline underline-offset-4'>Companies</Link></li>
                                    <li><Link to="/admin/jobs" className='hover:text-[#7209b7] transition-colors duration-300 hover:underline underline-offset-4'>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className='hover:text-[#7209b7] transition-colors duration-300 hover:underline underline-offset-4'>Home</Link></li>
                                    <li><Link to="/jobs" className='hover:text-[#7209b7] transition-colors duration-300 hover:underline underline-offset-4'>Jobs</Link></li>
                                    <li><Link to="/browse" className='hover:text-[#7209b7] transition-colors duration-300 hover:underline underline-offset-4'>Browse</Link></li>
                                </>
                            )
                        }


                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt={user?.fullname || "User avatar"} />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className=''>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt={user?.fullname || "User avatar"} />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600 gap-3'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer hover:text-[#7209b7] transition-colors'>
                                                        <User2 />
                                                        <Link to="/profile" className='font-medium'>View Profile</Link>
                                                    </div>
                                                )
                                            }

                                            <div className='flex w-fit items-center gap-2 cursor-pointer hover:text-[#7209b7] transition-colors' onClick={logoutHandler}>
                                                <LogOut />
                                                <span className='font-medium'>Logout</span>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>

        </div>
    )
}

export default Navbar