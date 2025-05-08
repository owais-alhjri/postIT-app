
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  user: [],
  isLoading:false,
  isSuccess:false,
  isError:false,
};


export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile", 
  async (userData) => {
    try {
   

      const response = await axios.put(
        `https://postit-app-server-jywo.onrender.com/updateUserProfile/${userData.get("email")}`,
        
    userData,
        
        {
          headers: {  
            "Content-Type": "multipart/form-data", 
          },
        }
      );

      const user = response.data.user;

      return user;
    } catch (error) {
      console.log(error);
    }
  }
);

export const logout = createAsyncThunk("/users/logout", 
  async()=>{
    try{
      const response = await axios.post("https://postit-app-server-jywo.onrender.com/logout");
      console.log(response);

    }catch(error){
      console.log(error);
    }
  }
);

export const login = createAsyncThunk('users/login', 
  async(userData) =>{
    try{
      const response = await axios.post("https://postit-app-server-jywo.onrender.com/login", {
        email:userData.email,
        password:userData.password,
      });
      const user = response.data.user;
      console.log(response);
      return user;
    }catch(error){
      const errorMessage = 'Invalid credentials';
      alert(errorMessage);
      throw new Error(errorMessage);
    }
  }
);

export const registerUser = createAsyncThunk('users/registerUser',
  async(userData) =>{
    try{
        const response = await axios.post('https://postit-app-server-jywo.onrender.com/registerUser',{
          name:userData.name,
          email:userData.email,
          password:userData.password,
        });
        console.log(response);
        const user = response.data.user;
        return user;
    }catch(error){
      console.log(error);
    }
  }
);
export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers:{
      addUser:(state, action)=>{
        state.user.push(action.payload);
      },
      deleteUser: (state, action) =>{
        state.user=state.user.filter((user)=>user.email !== action.payload);
      },
      updateUser:(state, action) =>{
        state.user.map((user)=>{
          if (user.email === action.payload.email){
            return{
              ...user,
              name : action.payload.name,
            password : action.payload.password,
            };
          }
          return user;
        });
      },

    },
    extraReducers:(builder)=>{
      builder.addCase(registerUser.pending,(state)=>{
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled,(state,action)=>{
        state.user.push(action.payload);
        state.isLoading = true;
      })
      .addCase(registerUser.rejected,(state)=>{
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(login.pending,(state)=>{
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload || [];
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(logout.pending,(state)=>{
        state.isLoading = true;
      })
      .addCase(logout.fulfilled,(state)=>{
        state.user = {email: '', name: '' };
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(logout.rejected,(state)=>{
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUserProfile.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })


    },
});


export const {addUser,deleteUser, updateUser} = userSlice.actions;
export default userSlice.reducer;