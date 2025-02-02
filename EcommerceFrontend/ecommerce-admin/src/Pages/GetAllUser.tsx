import { RootState } from '../Redux/Store';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../Redux/UsersSlice';

const GetAllUser: React.FC = () => {
  const host = "http://localhost:7002";
  const dispatch = useDispatch();

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${host}/api/auth/admin/v1/getAllUser`, {
        headers: {
          "Content-Type": "multipart/form-data",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODhhMWJlNWFmNTExM2I2OTVmMmE0ZCIsImlhdCI6MTczODIxNjQwOH0.5EZfnFRRfJ_3AhEsTZp5JKl_YP40M8VvGYMNfv0G2hs",
        },
      });
      const user = response.data.user;
      dispatch(setUsers(user));
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const Users = useSelector((state: RootState) => state.users); // Corrected useSelector

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <section className="pt-20">
      <div className="px-4 bg-gray-600 py-5">
        <h4 className="text-2xl font-semibold text-center text-white my-2 underline">
          All Users
        </h4>
        <table className="bg-gray-50 shadow-sm w-full border-[1px] border-gray-900 overflow-x-auto">
          <thead className="text-start">
            <tr className="border-[1px] border-gray-900">
              <th className="border-[1px] border-gray-900">Name</th>
              <th className="border-[1px] border-gray-900">Email</th>
              <th className="border-[1px] border-gray-900">Number</th>
              <th className="border-[1px] border-gray-900">Created At</th>
            </tr>
          </thead>
          <tbody>
            {Users.users && Users.users.length > 0 ? (
              Users.users.map((usr: any) => (
                <tr key={usr._id} className="border-[1px] border-gray-900">
                  <td className="px-2 border-[1px] border-gray-900">{usr.name}</td>
                  <td className="px-2 border-[1px] border-gray-900">{usr.email}</td>
                  <td className="px-2 border-[1px] border-gray-900">{usr.number}</td>
                  <td className="px-2 border-[1px] border-gray-900">{new Date(usr.createdAt).toString().split('GMT+0530 (India Standard Time)')}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-2">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default GetAllUser;
