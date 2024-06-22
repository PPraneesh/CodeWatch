import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Toast from './Toast';
import { MdDashboard } from "react-icons/md";
import { IoCreateSharp } from "react-icons/io5";
import { FaNoteSticky } from "react-icons/fa6";
import { RiLogoutBoxFill } from "react-icons/ri";


const SideBar: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();
    const path = useLocation()?.pathname;
    const location = path.split('/').pop();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const payload = localStorage.getItem('payload');
            if (payload) {
                setUser(JSON.parse(payload));
            }
        }
        else {
            navigate('/');
        }
    }, []);

    const username = user?.email.split('@')[0];
    const userType = user?.userType;
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('payload');
        Toast.Success('Logged Out Successfully');
        navigate('/');
    };

    return (
        <div className='h-full w-full p-12 bg-[#000000]'>
            <div className='flex flex-col items-center justify-center gap-4'>
                <div className='w-32 h-32  flex items-center justify-center bg-[#f8b739] uppercase rounded-full'>
                    {<p className='text-6xl text-black'>{user?.email?.split('@')[0][0]}</p>}
                </div>
                <div className='text-center text-[#ffffffcc] '>
                    <h1>{user?.name}</h1>
                    <h1>{user?.userType}</h1>
                    <p className='text-sm'>{user?.email}</p>
                </div>
            </div>
            <div>
                {
                    user && userType === 'teacher' ?
                        <ul className='flex flex-col gap-4 mt-8 '>
                            <Link to={`/teacher/${username}`}>
                                <li className={`text-lg font-bold ${location === username ? "text-[#f8b739]" : "text-white"}  border-[#3f3f3f] border-b-2 pb-2 hover:text-[#f8b739] flex flex-row gap-1 `}> <MdDashboard size={24}/> Dashboard</li>
                            </Link>
                            <Link to={`/teacher/${username}/create-test`}>
                                <li className={`text-lg font-bold ${location === "create-test" ? "text-[#f8b739]" : "text-white"}  border-[#3f3f3f] border-b-2 pb-2 hover:text-[#f8b739] flex flex-row gap-1`}><IoCreateSharp size={24} /> Create Test</li>
                            </Link>
                            <Link to={`/teacher/${username}/tests`}>
                                <li className={`text-lg font-bold ${location === "tests" ? "text-[#f8b739]" : "text-white"}  border-[#3f3f3f] border-b-2 pb-2 hover:text-[#f8b739] flex flex-row gap-1`}><FaNoteSticky size={24} />Tests</li>
                            </Link>
                            <li onClick={handleLogout} className='text-lg font-bold cursor-pointer text-[#ffffffcc]  border-[#3f3f3f] border-b-2 pb-2 flex hover:text-[#f8b739] flex-row gap-1'><RiLogoutBoxFill size={24} />Log Out</li>
                        </ul>
                        :
                        <ul className='flex flex-col gap-4 mt-8 text-white'>
                            <Link to={`/student/${username}`}>
                                <li className={`text-lg  border-[#3f3f3f] border-b-2 pb-2 ${location === username ? "text-[#f8b739]" : "text-white"} hover:text-[#f8b739] flex flex-row gap-1`}><MdDashboard size={24} /> Dashboard</li> 
                            </Link>
                            <Link to={`/student/${username}/test`}>
                                <li className={`text-lg border-[#3f3f3f] border-b-2 pb-2 ${location === "test" ? "text-[#f8b739]" : "text-white"} hover:text-[#f8b739] flex flex-row gap-1`} ><IoCreateSharp size={24} /> Enter Test</li> 
                            </Link>
                            <Link to={`/student/${username}/results`}>
                                <li className={`text-lg  border-[#3f3f3f] border-b-2 pb-2 ${location === "results" ? "text-[#f8b739]" : "text-white"} hover:text-[#f8b739] flex flex-row gap-1`}><FaNoteSticky size={24} />Results</li> 
                            </Link>
                            <li onClick={handleLogout} className='text-lg cursor-pointer border-[#3f3f3f] border-b-2 pb-2 text-[#ffffffcc] flex flex-row gap-1'><RiLogoutBoxFill size={24} /> Log Out</li> 
                        </ul>
                }
            </div>
        </div>
    );
};

export default SideBar;
