import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Toast from './Toast';

const SideBar: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

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
        <div className='h-full w-full p-12 border-r-2 border-black'>
            <div className='flex flex-col items-center justify-center gap-4'>
                <div className='w-32 h-32  flex items-center justify-center bg-gray-500 rounded-full'>
                    { <p className='text-7xl text-white'>{user?.email?.split('@')[0][0]}</p>}
                </div>
                <div className='text-center'>
                    <h1>{user?.name}</h1>
                    <h1>{user?.userType}</h1>
                    <p className='text-sm'>{user?.email}</p>
                </div>
            </div>
            <div>
                {
                    user && userType === 'teacher' ?
                        <ul className='flex flex-col gap-4 mt-8'>
                            <Link to={`/teacher/${username}`}>
                                <li className='text-lg font-bold'>Dashboard</li>
                            </Link>
                            <Link to={`/teacher/${username}/create-test`}>
                                <li className='text-lg font-bold'>Create Test</li>
                            </Link>
                            <Link to={`/teacher/${username}/prev-tests`}>
                                <li className='text-lg font-bold'>Previous Tests</li>
                            </Link>
                            <li onClick={handleLogout} className='text-lg font-bold cursor-pointer'>Log-Out</li>
                        </ul>
                        :
                        <ul className='flex flex-col gap-4 mt-8'>
                            <Link to={`/student/${username}`}>
                                <li className='text-lg font-bold'>Dashboard</li>
                            </Link>
                            <Link to={`/student/${username}/test`}>
                                <li className='text-lg font-bold'>Enter Test</li>
                            </Link>
                            <Link to={`/student/${username}/test-result`}>
                                <li className='text-lg font-bold'>Results</li>
                            </Link>
                            <li onClick={handleLogout} className='text-lg font-bold cursor-pointer'>Log-Out</li>
                        </ul>
                }
            </div>
        </div>
    );
};

export default SideBar;
