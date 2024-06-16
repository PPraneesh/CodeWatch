import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Toast from './Toast';
import { MdDashboard } from "react-icons/md";
import { IoCreateSharp } from "react-icons/io5";
import { FaNoteSticky } from "react-icons/fa6";
import { RiLogoutBoxFill } from "react-icons/ri";


const SideBar: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState("");

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
    console.log(user)
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('payload');
        Toast.Success('Logged Out Successfully');
        navigate('/');
    };

    return (
        <div className='h-full w-full p-12 bg-[#000000]'>
            <div className='flex flex-col items-center justify-center gap-4'>
                <div className='w-32 h-32  flex items-center justify-center bg-[#f8b739] rounded-full'>
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
                                <li onClick={() => setSelectedItem("dashboard")} style={{ color: selectedItem === "dashboard" ? '#f8b739' : '#ffffffcc' }} className='text-lg font-bold text-[#ffffffcc] border-b border-[#3f3f3f] border-b-2 pb-2 flex flex-row '> <MdDashboard size={24} /><span className='mx-1 hover:text-[#f8b739]'> Dashboard</span></li>
                            </Link>
                            <Link to={`/teacher/${username}/create-test`}>
                                <li onClick={() => setSelectedItem("createTest")} style={{ color: selectedItem === "createTest" ? '#f8b739' : '#ffffffcc' }} className='text-lg font-bold text-[#ffffffcc] border-b border-[#3f3f3f] border-b-2 pb-2 flex flex-row'><IoCreateSharp size={24} /> <span className='mx-1 hover:text-[#f8b739]'>Create Test</span></li>
                            </Link>
                            <Link to={`/teacher/${username}/tests`}>
                                <li onClick={() => setSelectedItem("tests")} style={{ color: selectedItem === "tests" ? '#f8b739' : '#ffffffcc' }} className='text-lg font-bold text-[#ffffffcc] border-b border-[#3f3f3f] border-b-2 pb-2 flex flex-row'><FaNoteSticky size={24} /><span className='mx-1 hover:text-[#f8b739]'>Tests</span></li>
                            </Link>
                            <li onClick={handleLogout} className='text-lg font-bold cursor-pointer text-[#ffffffcc] border-b border-[#3f3f3f] border-b-2 pb-2 flex flex-row'><RiLogoutBoxFill size={24} /><span className='mx-1 hover:text-[#f8b739]'>Log Out</span></li>
                        </ul>
                        :
                        <ul className='flex flex-col gap-4 mt-8 text-white'>
                            <Link to={`/student/${username}`}>
                                <li onClick={() => setSelectedItem("dashboard")} style={{ color: selectedItem === "dashboard" ? '#f8b739' : '#ffffffcc' }} className='text-lg border-b border-[#3f3f3f] border-b-2 pb-2 text-[#ffffffcc] flex flex-row'><MdDashboard size={24} /><span className='mx-1 hover:text-[#f8b739]'> Dashboard</span></li> {/* Add text color here */}
                            </Link>
                            <Link to={`/student/${username}/test`}>
                                <li onClick={() => setSelectedItem("test")} style={{ color: selectedItem === "test" ? '#f8b739' : '#ffffffcc' }} className='text-lg border-b border-[#3f3f3f] border-b-2 pb-2 text-[#ffffffcc] flex flex-row' ><IoCreateSharp size={24} /> <span className='mx-1 hover:text-[#f8b739]'>Enter Test</span></li> {/* Add text color here */}
                            </Link>
                            <Link to={`/student/${username}/results`}>
                                <li onClick={() => setSelectedItem("result")} style={{ color: selectedItem === "result" ? '#f8b739' : '#ffffffcc' }} className='text-lg border-b border-[#3f3f3f] border-b-2 pb-2 text-[#ffffffcc] flex flex-row'><FaNoteSticky size={24} /><span className='mx-1 hover:text-[#f8b739]'>Results</span></li> {/* Add text color here */}
                            </Link>
                            <li onClick={handleLogout} className='text-lg cursor-pointer border-b border-[#3f3f3f] border-b-2 pb-2 text-[#ffffffcc] flex flex-row'><RiLogoutBoxFill size={24} /> <span className='mx-1 hover:text-[#f8b739]'>Log Out</span></li> {/* Add text color here */}
                        </ul>
                    // <ul className='flex flex-col gap-4 mt-8 text-white'>
                    //     <Link to={`/student/${username}`}>
                    //         <li className='text-lg font-bold border-b border-[#3f3f3f] border-b-2 pb-2'>Dashboard</li>
                    //     </Link>
                    //     <Link to={`/student/${username}/test`}>
                    //         <li className='text-lg font-bold border-b border-[#3f3f3f] border-b-2 pb-2'>Enter Test</li>
                    //     </Link>
                    //     <Link to={`/student/${username}/test-result`}>
                    //         <li className='text-lg font-bold border-b border-[#3f3f3f] border-b-2 pb-2'>Results</li>
                    //     </Link>
                    //     <li onClick={handleLogout} className='text-lg font-bold cursor-pointer'>Log-Out</li>
                    // </ul>
                }
            </div>
        </div>
    );
};

export default SideBar;
