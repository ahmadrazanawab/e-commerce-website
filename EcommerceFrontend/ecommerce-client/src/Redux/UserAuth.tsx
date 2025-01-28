import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAuth } from "../components/ProductItemDefine";

interface UserStateProps {
    userAuth: UserAuth[];
}
const initialState : UserStateProps= {
    userAuth:[],
}

const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        signUp: (state, action: PayloadAction<UserAuth[]>) => {
            state.userAuth = action.payload 
        },
        signIn: (state, action: PayloadAction<UserAuth[]>) => {
            state.userAuth = action.payload 
        },
    }
});

export const { signUp, signIn } = userAuthSlice.actions;
export default userAuthSlice.reducer;
