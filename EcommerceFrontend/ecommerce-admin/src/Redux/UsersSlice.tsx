import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserDetails } from '../components/ProductItemDefine';

interface UserState {
    users: getUserDetails[];
};

const initialState: UserState = {
    users: [], // Start with an empty array of users
};

const UserSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<getUserDetails[]>) {
            state.users = action.payload; 
        }
    }
})

export const { setUsers } = UserSlice.actions;
export default UserSlice.reducer;
