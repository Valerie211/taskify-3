import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAllUsersApi } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

const ReflectionUsersTable = () => {
    const nav = useNavigate()
    const [users,setUsersData] =useState(null)
    const [loading,setLoading] = useState(false)
    const getUsers = async () => {
        setLoading(true)
        try {
          const result = await getAllUsersApi()
          if (result.status === 200) {
            console.log("res", result)
    
            setUsersData(result?.data?.user_list)
            setLoading(false)
          }
        } catch (error) {
          toast.error(error.message)
        }
      }
      const handleReflectionClick = (userId) => {
        nav(`/reflection-for-manager/${userId}`);
    };
      useEffect(() => {
        getUsers()
      }, [])
  return (
    <div className="overflow-x-auto mt-10">
      <table className="min-w-full  divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              First Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Last Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date Joined
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users?.map((user) => (
            <tr key={user.id} className='cursor-pointer'  onClick={()=>handleReflectionClick(user.id)}>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.first_name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.last_name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(user.date_joined).toLocaleString()}</td>
            </tr>
          ))}
          {
            loading && <p>Loading..</p>
          }
        </tbody>
      </table>
    </div>
  );
};

export default ReflectionUsersTable;
