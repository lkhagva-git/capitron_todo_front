import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
    const { auth } = useAuth();
    const profile = auth.profile;

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center space-x-4 mb-6">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {profile.last_name} овогтой {profile.first_name}
                    </h2>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Имэйл</h3>
                    <p className="text-gray-700 dark:text-gray-300">{profile.email}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Хэрэглэгчийн дугаар</h3>
                    <p className="text-gray-700 dark:text-gray-300">{profile.id}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
